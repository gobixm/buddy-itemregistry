"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("./../log");
const rc = require("rc");
const _ = require("lodash");
class Config {
    constructor() {
        this.consulHost = "localhost";
        this.consulPort = 9500;
        this.consulToken = "";
        this.consulId = "buddy_itemregistry-0";
        this.hosting = "https://localhost:8001";
        this.battleNetApiKey = "*";
        this.locale = "ru_RU";
        this.kafkaBrokers = "localhost:9092";
        this.mongoUrl = "mongodb://localhost:27017/wowbuddy-items";
    }
    async loadAsync() {
        const config = _.cloneDeep(rc("buddy_itemregistry", this));
        _.merge(this, config);
        config.battleNetApiKey = "*";
        log_1.default.info(config);
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map