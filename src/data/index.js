const knex = require('knex');
const config = require('config');
const {getLogger} = require('../core/logging');

const DATABASE_CLIENT = config.get('database.client');
const DATABASE_HOST = config.get('database.host');
const DATABASE_PORT = config.get('database.port');
const DATABASE_USERNAME = config.get('database.username');
const DATABASE_PASSWORD = config.get('database.password');
const DATABASE_DATABASE = config.get('database.database');
const NODE_ENV = config.get('env');
const isDevelopment = NODE_ENV === 'development';

let knexInstance;
// connectie db, migreren, seeding
const initializeDatabase = async () => {
  const knexOptions = {
    client: DATABASE_CLIENT,
    debug: isDevelopment,
    connection: {
      host : DATABASE_HOST,
      port : DATABASE_PORT,
      user : DATABASE_USERNAME,
      password : DATABASE_PASSWORD,
      database : DATABASE_DATABASE
    }
  }
  knexInstance = knex(knexOptions);
  // controleren db up en running
  try {
    await knexInstance.raw('SELECT 1+1 AS result');
  } catch (error) {
    getLogger().error('Error init db', {error});
    throw new Error('init db failed');
  }
};

const getKnex = () => {
  if (!knexInstance) {
    throw new Error('Connection not yet initialized');
  }
  return knexInstance;
}

const tables = Object.freeze({
  speler: 'spelers',
  team: 'teams',
  club: 'clubs',
  game: 'games'
});

module.exports={initializeDatabase, getKnex, tables};