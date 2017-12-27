"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("./log");
const mongodb_1 = require("mongodb");
const bson_1 = require("bson");
class ItemPreview {
}
exports.ItemPreview = ItemPreview;
class ItemStore {
    constructor(config) {
        this._config = config;
    }
    async getItemsPreview(page, name) {
        if (page < 1) {
            return [];
        }
        let query = {};
        if (name) {
            query.name = { $regex: name, $options: "i" };
        }
        await this.ensureDbAsync();
        return await this._db
            .collection("item")
            .find(query, { name: 1, description: 1, id: 1 })
            .skip(100 * (page - 1))
            .limit(100)
            .sort({ name: 1 })
            .toArray();
    }
    async getItemAsync(id) {
        return await this._db.collection("item").findOne({ _id: id });
    }
    async saveItemAsync(item) {
        let doc = {};
        Object.assign(doc, item);
        doc._id = item.id;
        await this._db
            .collection("item")
            .updateOne({ _id: doc._id }, doc, { upsert: true });
        log_1.default.info("saved item", { id: item.id });
    }
    async ensureDbAsync() {
        if (!this._db) {
            this._db = await mongodb_1.MongoClient.connect("mongodb://localhost:27017/wowbuddy-items", {
                poolSize: 10
            });
        }
    }
    async isIgnoredAsync(id) {
        await this.ensureDbAsync();
        let item = await this._db
            .collection("ignore")
            .findOne({ _id: new bson_1.ObjectID(id) });
        return item !== null;
    }
    async ignoreItemAsync(id) {
        await this.ensureDbAsync();
        await this._db.collection("ignore").insertOne({ _id: id });
        log_1.default.info("item added to ignore list", { id: id });
    }
}
exports.ItemStore = ItemStore;
//# sourceMappingURL=item-store.js.map