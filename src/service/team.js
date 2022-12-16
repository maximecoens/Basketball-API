const {getLogger} = require('../core/logging');
const teamRepository = require('../repository/team');
const ServiceError = require('../core/serviceError');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
}

const getAll = async () => {
  debugLog('Fetching all teams');
  const teams = await teamRepository.getAll();
  return {items: teams, count: await teamRepository.getCount()};
};

const getById =  async(teamId) => {
  debugLog(`Fetching team with id ${teamId}`);
  const team = await teamRepository.getById(teamId);
  if (!team) {
    throw ServiceError.notFound(`there is no team with id ${teamId}`, {teamId});
  };
  return team;
};

const create = async ({naam, clubId}) => {
  debugLog(`Creating new team`, {naam, clubId});
  const teamId =  await teamRepository.create({
    naam,
    clubId
  });
  return getById(teamId);
};

const updateById = async (teamId, {naam, clubId}) => {
  debugLog(`Updating team with id ${teamId}`, {naam, clubId});
  await teamRepository.updateById(teamId, {naam, clubId});
  return getById(teamId);
};

const deleteById = async (teamId) => {
  debugLog(`Deleting team with id ${teamId}`);
  await teamRepository.deleteById(teamId);
};

module.exports = {getAll, getById, create, updateById, deleteById};