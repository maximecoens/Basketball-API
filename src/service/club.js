const {getLogger} = require('../core/logging');
let {CLUBS} = require('../data/mock-data');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog('Fetching all clubs');
  return {items: CLUBS, count: CLUBS.length};
}

const getById = async (clubId) => {
  debugLog(`Fetching club with id ${clubId}`);
  return CLUBS.find(c => c.clubId === parseInt(clubId));
}

const create = async ({naam, hoofdsponsor, voorzitter, locatie}) => {
  debugLog(`Creating new club`, {naam, hoofdsponsor, voorzitter, locatie});
  const newClub = {
    id: Math.max(...CLUBS.map(c => c.clubId)) + 1,
    naam,
    hoofdsponsor, 
    voorzitter,
    locatie
  };

  CLUBS = [...CLUBS, newClub];
  return newClub;
}

const updateById = async (clubId, {naam, hoofdsponsor, voorzitter, locatie}) => {
  debugLog(`Updating club with id ${clubId}`, {naam, hoofdsponsor, voorzitter, locatie});
  let club = CLUBS.find(c => c.clubId === parseInt(clubId));
  if (!club) {
    throw new Error("club does not exist");
  }
  club.clubId = clubId;
  club.naam = naam;
  club.hoofdsponsor = hoofdsponsor;
  club.voorzitter = voorzitter;
  club.locatie = locatie;
  return club;
}

const deleteById = async (clubId) => {
  debugLog(`Deleting club with id ${clubId}`);
  CLUBS = CLUBS.filter(c => c.clubId !== parseInt(clubId));
}

module.exports = {getAll, getById, updateById, create, deleteById};