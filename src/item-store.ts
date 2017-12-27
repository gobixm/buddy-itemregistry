import { Config } from "./config/config";
import logger from "./log";
import { MongoClient, Db } from "mongodb";
import { Item } from "./models/item";
import { ObjectID } from "bson";

export class ItemPreview {
    name: string;
    description?: string;
    id: number;
}

export class ItemStore {
    private _db: Db;
    private _config: Config;

    constructor(config: Config) {
        this._config = config;
    }

    async getItemsPreview(page: number, name?: string): Promise<ItemPreview[]> {
        if (page < 1) {
            return [];
        }
        let query: any = {};
        if (name) {
            query.name = { $regex: name, $options: "i" };
        }
        await this.ensureDbAsync();
        return await this._db
            .collection("item")
            .find<ItemPreview>(query, { name: 1, description: 1, id: 1 })
            .skip(100 * (page - 1))
            .limit(100)
            .sort({ name: 1 })
            .toArray();
    }

    async getItemAsync(id: number): Promise<Item | null> {
        return await this._db.collection("item").findOne<Item>({ _id: id });
    }

    async saveItemAsync(item: Item): Promise<void> {
        let doc: any = {};
        Object.assign(doc, item);
        doc._id = item.id;

        await this._db
            .collection("item")
            .updateOne({ _id: doc._id }, doc, { upsert: true });
        logger.info("saved item", { id: item.id });
    }

    private async ensureDbAsync() {
        if (!this._db) {
            this._db = await MongoClient.connect(
                "mongodb://localhost:27017/wowbuddy-items",
                {
                    poolSize: 10
                }
            );
        }
    }

    async isIgnoredAsync(id: number): Promise<boolean> {
        await this.ensureDbAsync();
        let item = await this._db
            .collection<Item>("ignore")
            .findOne({ _id: new ObjectID(id) });
        return item !== null;
    }

    async ignoreItemAsync(id: number): Promise<void> {
        await this.ensureDbAsync();
        await this._db.collection("ignore").insertOne({ _id: id });
        logger.info("item added to ignore list", { id: id });
    }
}
