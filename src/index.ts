import fs = require('fs');
import {URL} from 'url';
import http = require('http');
import http2 = require('http2');
import * as Koa from "koa";
import * as Router from "koa-router";
import logger from './log';
import {Config} from './config/config';
import {Consul} from './consul';

async function bootstrap(consul: Consul) {
    logger.info('bootstrapping');
    try {
        await consul.registerAsync();
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
}

async function serve(config: Config) {
    const app = new Koa();
    const router = new Router();

    router.get('/api/health', function (ctx) {
        ctx.body = 'alive';
    });

    app
        .use(router.routes())
        .use(router.allowedMethods());

    const url = new URL(config.hosting);

    if (url.protocol === 'https') {
        const options = {
            key: fs.readFileSync('./config/ssl/item-registry.key'),
            cert: fs.readFileSync('./config/ssl/item-registry.crt'),
        };
        logger.info(`start listen on ${url.port} port`);
        http2.createSecureServer(options, app.callback() as any)
            .listen(url.port)
            .on('error', (err: string) => logger.error(err));
    } else {
        logger.info(`start listen on ${url.port} port`);
        const server = http.createServer();
        http.createServer(app.callback())
            .listen(url.port)
            .on('error', (err: string) => logger.error(err));
    }
}

async function run() {
    logger.info('loading config');
    let config = new Config();
    await config.loadAsync();
    let consul = new Consul(config);
    await bootstrap(consul);
    await serve(config);
}

run();

process.on('uncaughtException', (err) => {
    logger.error(err);
    process.exit(1)
});

