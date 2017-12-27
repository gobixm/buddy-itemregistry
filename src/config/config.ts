import logger from "./../log";
import rc = require("rc");
const _ = require("lodash");

export class Config {
    consulHost: string = "localhost";
    consulPort: number = 9500;
    consulToken: string = "";
    consulId: string = "buddy_itemregistry-0";
    hosting: string = "https://localhost:8001";
    battleNetApiKey: string = "*";
    locale: string = "ru_RU";
    kafkaBrokers: string = "localhost:9092";
    mongoUrl: string = "mongodb://localhost:27017/wowbuddy-items";

    async loadAsync() {
        const config = _.cloneDeep(rc("buddy_itemregistry", this));
        _.merge(this, config);
        config.battleNetApiKey = "*";
        logger.info(config);
    }
}
