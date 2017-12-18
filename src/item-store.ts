import {Config} from "./config/config";
import logger from './log';
import {MongoClient, Db} from 'mongodb';
import {Item} from "./models/item";
import {ObjectID} from "bson";

export class ItemStore {
    private _db: Db;
    private _config: Config;

    constructor(config: Config) {
        this._config = config;
    }

    async getItemAsync(id: number): Promise<Item | null> {
        return this._db.collection('item').findOne<Item>({_id: id});
    }

    async saveItemAsync(item: Item): Promise<void> {
        let doc: any = {};
        Object.assign(doc, item);
        doc._id = item.id;

        await this._db.collection('item').updateOne({_id: doc._id}, doc, {upsert: true});
        logger.info('saved item', {id: item.id});
    }

    private async ensureDbAsync() {
        if (!this._db) {
            this._db = await MongoClient.connect('mongodb://localhost:27017/wowbuddy-items', {
                poolSize: 10
            });
        }
    }

    async isIgnoredAsync(id: number): Promise<boolean> {
        await this.ensureDbAsync();
        let item = await this._db.collection<Item>('ignore').findOne({_id: new ObjectID(id)});
        return item !== null;
    }

    async ignoreItemAsync(id: number): Promise<void> {
        await this.ensureDbAsync();
        await this._db.collection('ignore').insertOne({_id: id});
        logger.info('item added to ignore list', {id: id})
    }
}