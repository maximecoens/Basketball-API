const {getLogger} = require('../core/logging');
let {GAMES, TEAMS} = require('../data/mock-data');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog('Fetching all games');
  return {items: GAMES, count: GAMES.length};
}

const getById = async (gameId) => {
  debugLog(`Fetching game with id ${gameId}`);
  return GAMES.find(g => parseInt(gameId) === g.gameId); 
}

const create = async ({locatie, scoreThuis, scoreUit, datum, thuisTeamId, uitTeamId}) => {
  debugLog(`Creating new game`, {locatie, scoreThuis, scoreUit, datum, thuisTeamId, uitTeamId});
  let existingThuisTeam;
  if (thuisTeamId) {
    existingThuisTeam = TEAMS.find(t => parseInt(thuisTeamId) === t.teamId);
  }
  if (!existingThuisTeam) {
    throw new Error(`team ${thuisTeamId} does not exist`);
  }

  let existingUitTeam;
  if (uitTeamId) {
    existingUitTeam = TEAMS.find(t => parseInt(uitTeamId) === t.teamId);
  }
  if (!existingUitTeam) {
    throw new Error(`team ${uitTeamId} does not exist`);
  }

  const newGame = {
    gameId: Math.max(...GAMES.map(g => g.gameId)) + 1,
    locatie,
    scoreThuis,
    scoreUit,
    datum: datum.toISOString(),
    thuisTeam: existingThuisTeam,
    uitTeam: existingUitTeam
  }

  GAMES = [...GAMES, newGame];
  return newGame;

}

const updateById = async (gameId, {locatie, scoreThuis, scoreUit, datum, thuisTeamId, uitTeamId}) => {
  debugLog(`Updating game with id ${gameId}`, {locatie, scoreThuis, scoreUit, datum, thuisTeamId, uitTeamId});
  let existingThuisTeam;
  if (thuisTeamId) {
    existingThuisTeam = TEAMS.find(t => parseInt(thuisTeamId) === t.teamId);
  }
  if (!existingThuisTeam) {
    throw new Error(`team ${thuisTeamId} does not exist`);
  }

  let existingUitTeam;
  if (uitTeamId) {
    existingUitTeam = TEAMS.find(t => parseInt(uitTeamId) === t.teamId);
  }
  if (!existingUitTeam) {
    throw new Error(`team ${uitTeamId} does not exist`);
  }
  let game = GAMES.find(g => parseInt(gameId) === g.gameId);
  if (!game) {
    throw new Error("game does not exist");
  }
  game.gameId = gameId;
  game.locatie = locatie;
  game.scoreThuis = scoreThuis;
  game.scoreUit = scoreUit;
  game.datum = datum.toISOString();
  game.thuisTeam = existingThuisTeam;
  game.uitTeam = existingUitTeam;
  return game;
}

const deleteById = async (gameId) => {
  debugLog(`Deleting game with id ${gameId}`);
  GAMES = GAMES.filter(g => g.gameId !== parseInt(gameId));
}

module.exports = {getAll, getById, create, updateById, deleteById};