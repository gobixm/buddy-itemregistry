import axios from 'axios';
import {Config} from "./config/config";
import logger from './log';
import {Item} from "./models/item";
import * as _ from "lodash";
import {ItemStore} from "./item-store";
import {ConsumerGroup, Message, Offset} from "kafka-node";
import {queue} from 'async';
import {Promise} from 'bluebird';

const ConsumerGroupStream = require('kafka-node').ConsumerGroupStream;
const es = require('event-stream');

export class ItemLoader {
    private _config: Config;
    private _store: ItemStore;
    private _consumer: ConsumerGroup;
    private _exists: Set<number> = new Set<number>();
    private _ignores: Set<number> = new Set<number>();

    constructor(store: ItemStore, config: Config) {
        this._store = store;
        this._config = config;
    }

    async startAsync() {
        let groupId = 'item-registry';
        let topic = 'auction-data';

        let kafkaConfig = {
            id: this._config.consulId,
            groupId: groupId,
            protocol: ['roundrobin'],
            kafkaHost: this._config.kafkaBrokers,
            fromOffset: 'earliest',
            sessionTimeout: 15000,
            autoCommit: true,
            autoCommitIntervalMs: 10000
        };
        await this.startConsumerFromOffsetAsync(kafkaConfig, groupId, topic);
    }

    private async startConsumerFromOffsetAsync(kafkaConfig: any, groupId: string, topic: string) {
        this._consumer = new ConsumerGroup(kafkaConfig, topic);
        // let offset = new Offset(this._consumer.client);
        // let o: any = Promise.promisifyAll(offset);
        // let topicData = await o.fetchLatestOffsetsAsync([topic]);
        // let offsets = _.map(_.keys(topicData[topic]), partition => {
        //     return {
        //         topic: topic,
        //         partition: Number.parseInt(partition)
        //     }
        // });
        // let commitsData = await o.fetchCommitsAsync(groupId, offsets);
        // let commits = _.map(commitsData[topic], (value: any, key: any) => {
        //     return {
        //         topic: topic,
        //         partition: Number.parseInt(key),
        //         offset: value < 0 ? 0 : value,
        //     };
        // });
        // await o.commitAsync(groupId, commits);
        this.consume();
    }

    private consume() {
        this._consumer.on('error', (error: any) => {
            logger.warn('failed to consume from commited offset', {error: error});
        });
        this._consumer.on('rebalancing', () => {
            logger.info('kafka rebalancing')
        });
        this._consumer.on('rebalanced', () => {
            logger.info('kafka rebalanced')
        });

        let q = queue(async (message: Message, callback) => {
            await this.loadItemAsync(JSON.parse(message.value).item)
                .then(() => callback());
        }, 5);

        this._consumer.on('message', message => {
            console.log('got');
            q.push(message, (err) => {

            });
        });
    }

    private async startConsumerFromEarliestAsync(kafkaConfig: any, groupId: string, topic: string) {
        this._consumer = new ConsumerGroupStream(kafkaConfig,
            topic);

        this._consumer.on('error', (error: any) => {
            logger.warn('failed to consume from earliest offset', {error: error});
            this._consumer.close(() => {
            });
        });
        this.consume();
    }

    async stopAsync() {
        if (!this._consumer) {
            return;
        }
        return new Promise((resolve, reject) => {
            this._consumer.commit((err: any, data: any) => {
                if (err) {
                    logger.error('failed to commit offset', {error: err});
                    reject(err);
                } else {
                    logger.info('offset commited ', {offset: data});
                    this._consumer.close(() => {
                        logger.info('consumer closed ');
                        resolve();
                    });
                }
            });
        });
    }

    private async loadItemAsync(id: number): Promise<void> {
        try {
            if (this._exists.has(id) || this._ignores.has(id)) {
                return;
            }
            if (await this._store.isIgnoredAsync(id)) {
                this._ignores.add(id);
                return;
            }
            let item = await
                this._store.getItemAsync(id);
            if (!item) {
                let json = await this.getItemJsonAsync(id);
                if (json == undefined) {
                    await this._store.ignoreItemAsync(id);
                } else {
                    await this._store.saveItemAsync(ItemLoader.mapItem(json));
                    this._exists.add(id);
                }
            }
        } catch (e) {
            logger.warn('failed to load item', {id: id, e: e});
        }
    }

    private async getItemJsonAsync(id: number): Promise<any> {
        let url = `https://eu.api.battle.net/wow/item/${id}?locale=${this._config.locale}&apikey=${this._config.battleNetApiKey}`;
        let res = await
            axios.get(url);
        if (res.status != 200) {
            logger.error('failed to get item.', {id: id, code: res.status, message: res.data});
            return undefined;
        } else {
            return res.data;
        }
    }

    private static mapItem(item: object): Item {
        let o = new Item();
        _.merge(o, item);
        return o;
    }
}