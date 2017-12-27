"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const log_1 = require("./log");
const mongodb_1 = require("mongodb");
const bluebird_1 = require("bluebird");
const item_1 = require("./models/item");
const _ = require("lodash");
const bson_1 = require("bson");
const mongo = bluebird_1.Promise.promisifyAll(mongodb_1.MongoClient);
class ItemRetriever {
    constructor(config) {
        this._ignores = new Set();
        this._config = config;
    }
    async getItemAsync(id) {
        await this.ensureDb();
        if (this._ignores.has(id)) {
            return undefined;
        }
        if (!this._exists.has(id)) {
            let item = await this.requestItemAsync(id);
            await this.saveItemAsync(item);
        }
        try {
        }
        catch (e) {
            log_1.default.error('failed to get item', { id: id, e: e });
            throw e;
        }
    }
    async saveItemAsync(item) {
        let model = this.mapItem(item);
        await this._db.collection('item').insertOneAsync({ _id: model.id });
        this._exists.add(model.id);
        return model;
    }
    async requestItemAsync(id) {
        let url = `https://eu.api.battle.net/wow/item/${id}?locale=${this._config.locale}&apikey=${this._config.battleNetApiKey}`;
        let res = await axios_1.default.get(url);
        if (res.status != 200) {
            log_1.default.error('failed to get item.', { id: id, code: res.status, message: res.data });
            await this.ignoreItemAsync(id);
        }
        else {
            return res.data;
        }
    }
    async ensureDb() {
        if (!this._db) {
            this._db = await mongo.connectAsync('mongodb://localhost:27017/wowbuddy-items', {
                poolSize: 10
            });
        }
    }
    async getItemFromMongo(id) {
        const o_id = new bson_1.ObjectID(id);
        await this._db.collection('item').findOneAsync({ _id: id });
    }
    mapItem(item) {
        let o = new item_1.Item();
        _.merge(o, item);
        return o;
    }
    async ignoreItemAsync(id) {
        let db = await mongo.connectAsync('mongodb://localhost:27017/test');
        await db.collection('ignore').insertOneAsync({ _id: id });
        log_1.default.info('item added to ignore list', { id: id });
    }
}
exports.ItemRetriever = ItemRetriever;
//# sourceMappingURL=item-retriever.js.map