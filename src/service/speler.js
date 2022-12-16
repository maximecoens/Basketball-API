const {getLogger} = require('../core/logging');
const spelerRepository = require('../repository/speler');
const ServiceError = require('../core/serviceError');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog('Fetching all players');
  const spelers = await spelerRepository.getAll();
  return {items: spelers, count: await spelerRepository.getCount()};
};

const getById = async (spelerId) => {
  debugLog(`Fetching player with id ${spelerId}`);
  const speler = await spelerRepository.getById(spelerId);

  if (!speler) {
    throw ServiceError.notFound(`There is no player with id ${spelerId}`, {spelerId});
  };

  return speler;
};

const create = async ({naam, gewicht, lengte, positie, geboortedatum, teamId}) => {
  debugLog(`Creating new player`, {naam, gewicht, lengte, positie, geboortedatum, teamId});
  const spelerId = await spelerRepository.create({
    naam,
    gewicht,
    lengte,
    positie,
    geboortedatum,
    teamId});
  return getById(spelerId);
};

const updateById = async (spelerId, {naam, gewicht, lengte, positie, geboortedatum, teamId}) => {
  debugLog(`Updating player with id ${spelerId}`, {naam, gewicht, lengte, positie, geboortedatum, teamId});
  await spelerRepository.updateById(spelerId, {naam, gewicht, lengte, positie, geboortedatum, teamId});
  return getById(spelerId);
};

const deleteById = async (spelerId) => {
  debugLog(`Deleting player with id ${spelerId}`);
  await spelerRepository.deleteById(spelerId);
};

module.exports={getAll, getById, create, updateById, deleteById};

