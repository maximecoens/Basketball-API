const {getLogger} = require('../core/logging');
const teamRepository = require('../repository/team');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
}

const getAll = async () => {
  debugLog('Fetching all teams');
  const teams = await teamRepository.getAll();
  return {items: teams, count: teams.length};
};

const getById =  async(teamId) => {
  debugLog(`Fetching team with id ${teamId}`);
  return await teamRepository.getById(teamId);
};

const create = async ({leeftijdscategorie, clubId}) => {
  debugLog(`Creating new team`, {leeftijdscategorie, clubId});
  return await teamRepository.create({
    leeftijdscategorie,
    clubId
  });
};

const updateById = async (teamId, {leeftijdscategorie, clubId}) => {
  debugLog(`Updating team with id ${teamId}`, {leeftijdscategorie, clubId});
  return await teamRepository.updateById(teamId, {leeftijdscategorie, clubId});
};

const deleteById = async (teamId) => {
  debugLog(`Deleting team with id ${teamId}`);
  await teamRepository.deleteById(teamId);
};

module.exports = {getAll, getById, create, updateById, deleteById};