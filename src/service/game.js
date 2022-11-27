const {getLogger} = require('../core/logging');
const gameRepository = require('../repository/game');

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
  return await gameRepository.getById(gameId);
};

const create = async ({locatie, scoreThuis, scoreUit, datum, thuisTeamId, uitTeamId}) => {
  debugLog(`Creating new game`, {locatie, scoreThuis, scoreUit, datum, thuisTeamId, uitTeamId});
  return await gameRepository.create({
    locatie,
    scoreThuis,
    scoreUit,
    datum,
    thuisTeamId,
    uitTeamId
  });
};

const updateById = async (gameId, {locatie, scoreThuis, scoreUit, datum, thuisTeamId, uitTeamId}) => {
  debugLog(`Updating game with id ${gameId}`, {locatie, scoreThuis, scoreUit, datum, thuisTeamId, uitTeamId});
  return await gameRepository.updateById(gameId, {
    locatie,
    scoreThuis,
    scoreUit,
    datum,
    thuisTeamId,
    uitTeamId
  });
};

const deleteById = async (gameId) => {
  debugLog(`Deleting game with id ${gameId}`);
  await gameRepository.deleteById(gameId);
}

module.exports = {getAll, getById, create, updateById, deleteById};