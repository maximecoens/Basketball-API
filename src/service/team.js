const {getLogger} = require('../core/logging');
const teamRepository = require('../repository/team');

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
  return await teamRepository.getById(teamId);
};

const create = async ({naam, clubId}) => {
  debugLog(`Creating new team`, {naam, clubId});
  return await teamRepository.create({
    naam,
    clubId
  });
};

const updateById = async (teamId, {naam, clubId}) => {
  debugLog(`Updating team with id ${teamId}`, {naam, clubId});
  return await teamRepository.updateById(teamId, {naam, clubId});
};

const deleteById = async (teamId) => {
  debugLog(`Deleting team with id ${teamId}`);
  await teamRepository.deleteById(teamId);
};

module.exports = {getAll, getById, create, updateById, deleteById};