import {Config} from "./config/config";

const consul = require("consul");
import logger from './log';


export class Consul {
    private _client: any;
    private _config: Config;

    constructor(config: Config) {
        this._config = config;
        this._client = consul({
            host: config.consulHost,
            port: config.consulPort,
            defaults: {
                token: config.consulToken
            },
            promisify: true
        });
    }

    async registerAsync() {
        let config = {
            id: this._config.consulId,
            name: 'item-registry',
            check: {
                http: `${this._config.hosting}/api/health`,
                interval: '15s',
                tls_skip_verify: true
            }
        };
        logger.info('registering service in consul with params...', config);
        try {
            await this._client.agent.service.register(config);
            logger.info('service registered');
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    async unregisterAsync() {
        logger.info('unregistering service in consul...');
        try {
            await this._client.agent.service.deregister(this._config.consulId);
            logger.info('unregistered');
        }
        catch (e) {
            logger.error(e);
            throw e;
        }
    }

    async getValueAsync(key: string) {
        try {
            let result = (await this._client.kv.get(key));
            if (!result) {
                return {};
            }
            return JSON.parse(result.Value);
        }
        catch (e) {
            logger.error(e);
            throw e;
        }
    }

    async setValueAsync(key: string, value: object) {
        try {
            await this._client.kv.set({
                key: key,
                value: JSON.stringify(value)
            });
        }
        catch (e) {
            logger.error(e);
            throw e;
        }
    }
};