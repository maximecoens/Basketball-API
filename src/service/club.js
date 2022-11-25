const {getLogger} = require('../core/logging');
const clubRepository = require('../repository/club');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog('Fetching all clubs');
  const clubs = await clubRepository.getAll();
  return {items: clubs, count: clubs.length};
}

const getById = async (clubId) => {
  debugLog(`Fetching club with id ${clubId}`);
  return await clubRepository.getById(clubId);
}

const create = async ({naam, hoofdsponsor, voorzitter, locatie}) => {
  debugLog(`Creating new club`, {naam, hoofdsponsor, voorzitter, locatie});
  return await clubRepository.create({
    naam,
    hoofdsponsor, 
    voorzitter,
    locatie
  });
}

const updateById = async (clubId, {naam, hoofdsponsor, voorzitter, locatie}) => {
  debugLog(`Updating club with id ${clubId}`, {naam, hoofdsponsor, voorzitter, locatie});
  return await clubRepository.updateById(clubId, {naam, hoofdsponsor, voorzitter, locatie});
};

const deleteById = async (clubId) => {
  debugLog(`Deleting club with id ${clubId}`);
  await clubRepository.deleteById(clubId);
}

module.exports = {getAll, getById, updateById, create, deleteById};