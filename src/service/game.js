const {getLogger} = require('../core/logging');
const gameRepository = require('../repository/game');
const ServiceError = require('../core/serviceError');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog('Fetching all games');
  const games = await gameRepository.getAll();
  return {items: games, count: await gameRepository.getCount()};
};

const getById = async (gameId) => {
  debugLog(`Fetching game with id ${gameId}`);
  const game = await gameRepository.getById(gameId);

  if (!game) {
    throw ServiceError.notFound(`There is no game with id ${gameId}`, {gameId});
  };

  return game;
};



const create = async ({locatie, scoreThuis, scoreUit, datum, thuisTeamId, uitTeamId}) => {
  debugLog(`Creating new game`, {locatie, scoreThuis, scoreUit, datum, thuisTeamId, uitTeamId});
  const gameId = await gameRepository.create({
    locatie,
    scoreThuis,
    scoreUit,
    datum,
    thuisTeamId,
    uitTeamId
  });
  return getById(gameId);
};

const updateById = async (gameId, {locatie, scoreThuis, scoreUit, datum, thuisTeamId, uitTeamId}) => {
  debugLog(`Updating game with id ${gameId}`, {locatie, scoreThuis, scoreUit, datum, thuisTeamId, uitTeamId});
  await gameRepository.updateById(gameId, {
    locatie,
    scoreThuis,
    scoreUit,
    datum,
    thuisTeamId,
    uitTeamId
  });
  return getById(gameId);
};

const deleteById = async (gameId) => {
  debugLog(`Deleting game with id ${gameId}`);
  await gameRepository.deleteById(gameId);
}

module.exports = {getAll, getById, create, updateById, deleteById};