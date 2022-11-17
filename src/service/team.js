const {getLogger} = require('../core/logging');
let {TEAMS, CLUBS} = require('../data/mock-data');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
}

const getAll = async () => {
  debugLog('Fetching all teams');
  return {items: TEAMS, count: TEAMS.length};
};

const getById =  async(teamId) => {
  debugLog(`Fetching team with id ${teamId}`);
  return TEAMS.find(t => parseInt(teamId) === t.teamId);
};

const create = async ({leeftijdscategorie, clubId}) => {
  debugLog(`Creating new team`, {leeftijdscategorie, clubId});
  let existingClub;
  if (clubId) {
    existingClub = CLUBS.find(c => parseInt(clubId) === c.clubId);
  }
  if (!existingClub) {
    throw new Error(`club ${clubId} does not exist`);
  }

  const newTeam = {
    teamId: Math.max(...TEAMS.map(t => t.teamId)) + 1,
    leeftijdscategorie,
    club: existingClub
  };

  TEAMS = [...TEAMS, newTeam];
  return newTeam;
}

const updateById = async (teamId, {leeftijdscategorie, clubId}) => {
  debugLog(`Updating team with id ${teamId}`, {leeftijdscategorie, clubId});
  let existingClub;
  if (clubId) {
    existingClub = CLUBS.find(c => parseInt(clubId) === c.clubId);
  }
  if (!existingClub) {
    throw new Error(`club ${clubId} does not exist`);
  }
  let team = TEAMS.find(t => parseInt(teamId) === t.teamId);
  if (!team) {
    throw new Error("Team does not exist");
  }
  team.teamId = teamId;
  team.leeftijdscategorie = leeftijdscategorie;
  team.club = existingClub;
  return team;
}

const deleteById = async (teamId) => {
  debugLog(`Deleting team with id ${teamId}`);
  TEAMS = TEAMS.filter(t => t.teamId !== parseInt(teamId));
}

module.exports = {getAll, getById, create, updateById, deleteById};