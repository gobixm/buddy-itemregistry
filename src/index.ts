import fs = require("fs");
import { URL } from "url";
import http = require("http");
import http2 = require("http2");
import * as Koa from "koa";
import * as Router from "koa-router";
import * as cors from "koa2-cors";
import logger from "./log";
import { Config } from "./config/config";
import { Consul } from "./consul";
import { ItemLoader } from "./item-loader";
import { ItemStore } from "./item-store";
import { Server } from "http";
import { Http2SecureServer } from "http2";
import { Promise } from "bluebird";
import * as dotenv from "dotenv";

async function bootstrap(consul: Consul) {
    logger.info("bootstrapping");
    try {
        await consul.registerAsync();
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
}

async function serve(
    config: Config,
    store: ItemStore
): Promise<Server | Http2SecureServer> {
    const app = new Koa();
    const router = new Router();

    router.get("/api/health", function(ctx) {
        ctx.body = "alive";
    });

    router.get("/api/items/preview", async function(ctx) {
        let page = ctx.query.page || 1;
        let name = ctx.query.name;
        ctx.body = await store.getItemsPreview(page, name);
    });

    app
        .use(cors())
        .use(router.routes())
        .use(router.allowedMethods());

    const url = new URL(config.hosting);

    if (url.protocol === "https") {
        const options = {
            key: fs.readFileSync("./config/ssl/item-registry.key"),
            cert: fs.readFileSync("./config/ssl/item-registry.crt")
        };
        logger.info(`start listen on ${url.port} port`);
        return await http2
            .createSecureServer(options, app.callback() as any)
            .listen(url.port)
            .on("error", (err: string) => logger.error(err));
    } else {
        logger.info(`start listen on ${url.port} port`);

        return await http
            .createServer(app.callback())
            .listen(url.port)
            .on("error", (err: string) => logger.error(err));
    }
}

async function run() {
    logger.info("loading config");
    let config = new Config();
    await config.loadAsync();
    let consul = new Consul(config);
    await bootstrap(consul);
    let store = new ItemStore(config);
    let server = await serve(config, store);
    let loader = new ItemLoader(store, config);
    loader.startAsync();

    process.on("uncaughtException", async err => {
        await logger.error(err);
        shutdown();
        process.exit(1);
    });

    let shutdown = async function() {
        logger.info("exiting");
        let srv: any = Promise.promisifyAll(server);
        await srv.closeAsync();
        await consul.unregisterAsync();
        await loader.stopAsync();
    };
    process.on("SIGINT", async () => {
        await shutdown();
    });
    process.on("SIGTERM", async () => {
        await shutdown();
    });
    process.on("SIGHUP", async () => {
        await shutdown();
    });
    process.on("SIGBREAK", async () => {
        await shutdown();
    });
}

dotenv.config({path: `${__dirname}/../.env`});
run();
