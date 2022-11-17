const {getLogger} = require('../core/logging');
let {SPELERS, TEAMS} = require('../data/mock-data');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
}

const getAll = async () => {
  debugLog('Fetching all players');
  return  Promise.resolve({items: SPELERS, count: SPELERS.length});
}

const getById = async (spelerId) => {
  debugLog(`Fetching player with id ${spelerId}`);
  return SPELERS.find(s => parseInt(spelerId) === s.spelerId);
}

const create = async ({naam, gewicht, lengte, positie, geboortedatum, teamId}) => {
  debugLog(`Creating new player`, {naam, gewicht, lengte, positie, geboortedatum, teamId});
  let existingTeam;
  if (teamId) {
    existingTeam = TEAMS.find(t => parseInt(teamId) === t.teamId);
  }
  if (!existingTeam) {
    throw new Error(`team ${teamId} does not exist`);

  }

  const newSpeler = {
    spelerId: Math.max(...SPELERS.map(s => s.spelerId)) + 1,
    naam,
    gewicht,
    lengte,
    positie,
    geboortedatum: geboortedatum.toISOString(),
    team: existingTeam
  };

  SPELERS = [...SPELERS, newSpeler];
  return newSpeler;
}

const updateById = (spelerId, {naam, gewicht, lengte, positie, geboortedatum, teamId}) => {
  debugLog(`Updating player with id ${spelerId}`, {naam, gewicht, lengte, positie, geboortedatum, teamId});
  let existingTeam;
  if (teamId) {
    existingTeam = TEAMS.find(t => teamId === t.teamId);
  }
  if (!existingTeam) {
    throw new Error(`team ${teamId} does not exist`);

  }
  let speler = SPELERS.find(s => s.spelerId === parseInt(spelerId));
  if (!speler) {
    throw new Error("player does not exist");
  }
  speler.spelerId = spelerId;
  speler.naam = naam;
  speler.gewicht = gewicht;
  speler.lengte = lengte;
  speler.positie = positie;
  speler.geboortedatum = geboortedatum.toISOString();
  speler.team = existingTeam;
  return speler;
}

const deleteById = async (spelerId) => {
  debugLog(`Deleting player with id ${spelerId}`);
  SPELERS = SPELERS.filter(s => s.spelerId !== parseInt(spelerId));
}

// kijk naar place en placeid voor team en speler te doen adhv teamid

module.exports={getAll, getById, create, updateById, deleteById};

