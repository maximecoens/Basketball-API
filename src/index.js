const Koa = require('koa');
const {getLogger} = require('./core/logging'); // logger winston gerbuiken uit logging.js
const config = require('config');
const bodyParser = require('koa-bodyparser');
const installRest = require('./rest/index');

const logger = getLogger();
const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');
logger.info(`env: ${NODE_ENV}, level: ${LOG_LEVEL}, disabled: ${LOG_DISABLED}`);

const app = new Koa();
app.use(bodyParser());
installRest(app); // vanuit index.js in /rest

app.listen(9000);
logger.info("server started");