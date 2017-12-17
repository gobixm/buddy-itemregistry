const winston = require('winston');

const {createLogger, format, transports} = require('winston');
const {combine, timestamp, prettyPrint} = format;

const log = createLogger({
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'logs/miner.log'})
    ]
});

export default log;