import util = require('util');
import fs = require('fs');
import logger from './../log';

const yargs = require('yargs');
const _ = require('lodash');

const readFile = util.promisify(fs.readFile);
const stat = util.promisify(fs.stat);

export class Config {
    consulHost: string = 'localhost';
    consulPort: number = 9500;
    consulToken: string = '';
    consulId: string = 'item-registry-0';
    hosting: string = 'https://localhost:8001';
    battleNetApiKey: string = '';
    locale: string = 'ru_RU';
    kafkaBrokers: string = 'localhost:9092';
    mongoUrl: string = 'mongodb://localhost:27017/wowbuddy-items';

    async loadAsync() {
        let usage = 'Usage:' +
            '--hosting [url]\n' +
            '--consul-host [string]\n' +
            '--consul-port [num]\n' +
            '--consul-token [string]\n' +
            '--consul-id [string]\n' +
            '--config [string]\n' +
            '--battle-net-api-key [string]\n' +
            '--locale [string]\n' +
            '--kafka-brokers [string;string]';

        let argv = yargs
            .usage(usage)
            .argv;

        let config = Config._readArgs(argv);
        config = _.defaultsDeep(config, Config._readEnv());
        try {
            config = _.defaultsDeep(config, Config._readFileAsync(argv.config ? argv.config : 'config.json'));
            console.log(config);
        } catch (e) {
            console.warn('Failed to load config from file.', e);
        }
        config = _.defaultsDeep(config, this);
        _.merge(this, config);
        config.battleNetApiKey = '*';
        config['battle-net-api-key'] = '*';
        logger.info(config);
    }


    static _readArgs(argv: object) {
        let config = {};
        return _.assign(config, argv);
    }

    static async _readFileAsync(path: string) {
        try {
            await stat(path);
        } catch (e) {
            return;
        }

        let content = await readFile(path, 'utf8');
        return Promise.resolve(JSON.parse(content));
    }

    static _readEnv() {
        return {
            consulHost: process.env.BUDDY_CONSUL_HOST,
            consulPort: process.env.BUDDY_CONSUL_PORT,
            consulToken: process.env.BUDDY_CONSUL_TOKEN,
            consulId: process.env.BUDDY_REGISTRY_CONSUL_ID,
            hosting: process.env.BUDDY_REGISTRY_HOSTING,
            battleNetApiKey: process.env.BUDDY_REGISTRY_BATTLE_NET_API_KEY,
            locale: process.env.BUDDY_REGISTRY_LOCALE,
            kafkaBrokers: process.env.BUDDY_REGISTRY_KAFKA_BROKERS,
            mongoUrl: process.env.BUDDY_MINER_MONGO_URL,
        }
    }
}
