"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const url_1 = require("url");
const http = require("http");
const http2 = require("http2");
const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa2-cors");
const log_1 = require("./log");
const config_1 = require("./config/config");
const consul_1 = require("./consul");
const item_loader_1 = require("./item-loader");
const item_store_1 = require("./item-store");
const bluebird_1 = require("bluebird");
const dotenv = require("dotenv");
async function bootstrap(consul) {
    log_1.default.info("bootstrapping");
    try {
        await consul.registerAsync();
    }
    catch (e) {
        log_1.default.error(e);
        process.exit(1);
    }
}
async function serve(config, store) {
    const app = new Koa();
    const router = new Router();
    router.get("/api/health", function (ctx) {
        ctx.body = "alive";
    });
    router.get("/api/items/preview", async function (ctx) {
        let page = ctx.query.page || 1;
        let name = ctx.query.name;
        ctx.body = await store.getItemsPreview(page, name);
    });
    app
        .use(cors())
        .use(router.routes())
        .use(router.allowedMethods());
    const url = new url_1.URL(config.hosting);
    if (url.protocol === "https") {
        const options = {
            key: fs.readFileSync("./config/ssl/item-registry.key"),
            cert: fs.readFileSync("./config/ssl/item-registry.crt")
        };
        log_1.default.info(`start listen on ${url.port} port`);
        return await http2
            .createSecureServer(options, app.callback())
            .listen(url.port)
            .on("error", (err) => log_1.default.error(err));
    }
    else {
        log_1.default.info(`start listen on ${url.port} port`);
        return await http
            .createServer(app.callback())
            .listen(url.port)
            .on("error", (err) => log_1.default.error(err));
    }
}
async function run() {
    log_1.default.info("loading config");
    let config = new config_1.Config();
    await config.loadAsync();
    let consul = new consul_1.Consul(config);
    await bootstrap(consul);
    let store = new item_store_1.ItemStore(config);
    let server = await serve(config, store);
    let loader = new item_loader_1.ItemLoader(store, config);
    loader.startAsync();
    process.on("uncaughtException", async (err) => {
        await log_1.default.error(err);
        shutdown();
        process.exit(1);
    });
    let shutdown = async function () {
        log_1.default.info("exiting");
        let srv = bluebird_1.Promise.promisifyAll(server);
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
dotenv.config({ path: `${__dirname}/../.env` });
run();
//# sourceMappingURL=index.js.map