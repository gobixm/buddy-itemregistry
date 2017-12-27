"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const log_1 = require("./log");
const kafka_node_1 = require("kafka-node");
const async_1 = require("async");
const bluebird_1 = require("bluebird");
const item_factory_1 = require("./item-factory");
const ConsumerGroupStream = require("kafka-node").ConsumerGroupStream;
const es = require("event-stream");
class ItemLoader {
    constructor(store, config) {
        this._exists = new Set();
        this._ignores = new Set();
        this._store = store;
        this._config = config;
    }
    async startAsync() {
        this.consume();
    }
    consume() {
        let groupId = "buddy-itemregistry";
        let topic = "auction-data";
        let kafkaConfig = {
            id: this._config.consulId,
            groupId: groupId,
            protocol: ["roundrobin"],
            kafkaHost: this._config.kafkaBrokers,
            fromOffset: "earliest",
            sessionTimeout: 15000,
            autoCommit: true,
            autoCommitIntervalMs: 100000
        };
        this._consumer = new kafka_node_1.ConsumerGroup(kafkaConfig, topic);
        this._consumer.on("error", (error) => {
            log_1.default.warn("failed to consume from commited offset", {
                error: error
            });
        });
        this._consumer.on("rebalancing", () => {
            log_1.default.info("kafka rebalancing");
        });
        this._consumer.on("rebalanced", () => {
            log_1.default.info("kafka rebalanced");
        });
        let q = async_1.queue(async (message, callback) => {
            await this.loadItemAsync(JSON.parse(message.value).item).then(() => callback());
        }, 5);
        this._consumer.on("message", message => {
            q.push(message, err => { });
        });
    }
    async startConsumerFromEarliestAsync(kafkaConfig, groupId, topic) {
        this._consumer = new ConsumerGroupStream(kafkaConfig, topic);
        this._consumer.on("error", (error) => {
            log_1.default.warn("failed to consume from earliest offset", {
                error: error
            });
            this._consumer.close(() => { });
        });
        this.consume();
    }
    async stopAsync() {
        if (!this._consumer) {
            return;
        }
        return new bluebird_1.Promise((resolve, reject) => {
            this._consumer.commit((err, data) => {
                if (err) {
                    log_1.default.error("failed to commit offset", { error: err });
                    reject(err);
                }
                else {
                    log_1.default.info("offset commited ", { offset: data });
                    this._consumer.close(() => {
                        log_1.default.info("consumer closed ");
                        resolve();
                    });
                }
            });
        });
    }
    async loadItemAsync(id) {
        try {
            if (this._exists.has(id) || this._ignores.has(id)) {
                return;
            }
            if (await this._store.isIgnoredAsync(id)) {
                this._ignores.add(id);
                return;
            }
            let item = await this._store.getItemAsync(id);
            if (!item) {
                let json = await this.getItemJsonAsync(id);
                if (json == undefined) {
                    await this._store.ignoreItemAsync(id);
                }
                else {
                    let mapped = ItemLoader.mapItem(json);
                    await this._store.saveItemAsync(mapped);
                    this._exists.add(id);
                }
            }
        }
        catch (e) {
            log_1.default.warn("failed to load item", { id: id, e: e });
        }
    }
    async getItemJsonAsync(id) {
        let url = `https://eu.api.battle.net/wow/item/${id}?locale=${this._config.locale}&apikey=${this._config.battleNetApiKey}`;
        let res = await axios_1.default.get(url);
        if (res.status != 200) {
            log_1.default.error("failed to get item.", {
                id: id,
                code: res.status,
                message: res.data
            });
            return undefined;
        }
        else {
            return res.data;
        }
    }
    static mapItem(item) {
        return item_factory_1.ItemFactory.create(item);
    }
}
exports.ItemLoader = ItemLoader;
//# sourceMappingURL=item-loader.js.map