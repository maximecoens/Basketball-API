const {getLogger} = require('../core/logging');
const clubRepository = require('../repository/club');
const ServiceError = require('../core/serviceError');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog('Fetching all clubs');
  const clubs = await clubRepository.getAll();
  return {items: clubs, count: await clubRepository.getCount()};
}

const getById = async (clubId) => {
  debugLog(`Fetching club with id ${clubId}`);
  const club =  await clubRepository.getById(clubId);

  if (!club) {
    throw ServiceError.notFound(`There is no club with id ${clubId}`, {clubId});
  };

  return club;
};

const create = async ({naam, hoofdsponsor, voorzitter, locatie}) => {
  debugLog(`Creating new club`, {naam, hoofdsponsor, voorzitter, locatie});
  const clubId = await clubRepository.create({
    naam,
    hoofdsponsor, 
    voorzitter,
    locatie
  });
  return getById(clubId);
};

const updateById = async (clubId, {naam, hoofdsponsor, voorzitter, locatie}) => {
  debugLog(`Updating club with id ${clubId}`, {naam, hoofdsponsor, voorzitter, locatie});
  await clubRepository.updateById(clubId, {naam, hoofdsponsor, voorzitter, locatie});
  return getById(clubId);
};

const deleteById = async (clubId) => {
  debugLog(`Deleting club with id ${clubId}`);
  await clubRepository.deleteById(clubId);
}

module.exports = {getAll, getById, updateById, create, deleteById};