const Koa = require('koa');
const {getLogger, initializeLogger} = require('./core/logging'); // logger winston gerbuiken uit logging.js
const config = require('config');
const bodyParser = require('koa-bodyparser');
const installRest = require('./rest/index');
const {initializeDatabase, shutdownData} = require('./data/index');
const koaCors = require('@koa/cors');

const NODE_ENV = config.get('env');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

module.exports = async function createServer () {

	initializeLogger({
		level: LOG_LEVEL,
		disabled: LOG_DISABLED,
		defaultMeta: {NODE_ENV}
	});

	await initializeDatabase();

	const app = new Koa();
	const logger = getLogger();

	app.use(
		koaCors({
			origin: (ctx) => {
				if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
					return ctx.request.header.origin;
				}
				// Not a valid domain at this point, let's return the first valid as we should return a string
				return CORS_ORIGINS[0];
			},
			allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
			maxAge: CORS_MAX_AGE,
		})
	);
	app.use(bodyParser());
	installRest(app); // vanuit index.js in /rest

	return {
    getApp(){
      return app;
    },
    start() {
			return new Promise((resolve) => {
				app.listen(9000);
				logger.info(`🚀 Server listening on http://localhost:9000`);
				resolve();
			});
		},
		async stop() { // ctrl + C 
			app.removeAllListeners();
			await shutdownData();
			getLogger().info('Goodbye');
		}
  };
}