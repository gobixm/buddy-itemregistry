"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consul = require("consul");
const log_1 = require("./log");
class Consul {
    constructor(config) {
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
            name: "buddy_itemregistry",
            check: {
                http: `${this._config.hosting}/api/health`,
                interval: "15s",
                tls_skip_verify: true
            }
        };
        log_1.default.info("registering service in consul with params...", config);
        try {
            await this._client.agent.service.register(config);
            log_1.default.info("service registered");
        }
        catch (e) {
            log_1.default.error(e);
            throw e;
        }
    }
    async unregisterAsync() {
        log_1.default.info("unregistering service in consul...");
        try {
            await this._client.agent.service.deregister(this._config.consulId);
            log_1.default.info("unregistered");
        }
        catch (e) {
            log_1.default.error(e);
            throw e;
        }
    }
    async getValueAsync(key) {
        try {
            let result = await this._client.kv.get(key);
            if (!result) {
                return {};
            }
            return JSON.parse(result.Value);
        }
        catch (e) {
            log_1.default.error(e);
            throw e;
        }
    }
    async setValueAsync(key, value) {
        try {
            await this._client.kv.set({
                key: key,
                value: JSON.stringify(value)
            });
        }
        catch (e) {
            log_1.default.error(e);
            throw e;
        }
    }
}
exports.Consul = Consul;
//# sourceMappingURL=consul.js.map