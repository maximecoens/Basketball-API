const {getKnex, tables} = require('../data/index');
const {getLogger} = require('../core/logging');

const SELECT_COLUMNS = [
  `${tables.team}.teamId`, `${tables.team}.naam`,
  `${tables.club}.clubId`, `${tables.club}.naam as clubNaam`, `${tables.club}.hoofdsponsor`, 
  `${tables.club}.voorzitter`, `${tables.club}.locatie`
];

const formatTeam = ({clubId, clubNaam, hoofdsponsor, voorzitter, locatie, ...rest}) => ({
  ...rest,
  club: {
    clubId,
    naam: clubNaam,
    hoofdsponsor,
    voorzitter,
    locatie
  }
});

const getAll = async () => {
  return await getKnex() (tables.team)
  .select('teamId', `${tables.team}.naam`, `${tables.team}.clubId`, `${tables.club}.naam as clubnaam`)
  .join(`${tables.club}`, `${tables.club}.clubId`, '=', `${tables.team}.clubId`);
};

const getById = async (teamId) => {
  const team = await getKnex() (tables.team)
  .where('teamId', teamId)
  .first(SELECT_COLUMNS)
  .join(`${tables.club}`, `${tables.club}.clubId`, '=', `${tables.team}.clubId`);
  return team && formatTeam(team);
};

const create = async ({naam, clubId}) => {
  try {
    const [teamId] = await getKnex() (tables.team)
    .insert({
      naam,
      clubId
    });
    return teamId;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in create', {error});
    throw error;
  }
};

const updateById = async (teamId, {naam, clubId}) => {
  try {
    await getKnex() (tables.team)
    .update({
      naam,
      clubId
    })
    .where('teamId', teamId);
    return await getById(teamId);
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in updateById', {error});
    throw error;
  }
};

const deleteById = async (teamId) => {
  const rowsAffected = await getKnex() (tables.team)
  .where('teamId', teamId)
  .del();
  return rowsAffected > 0; 
};

const getCount = async () => {
  const [count] = await getKnex() (tables.team).count();
  return count['COUNT(*)'];
};

module.exports = {getAll, getById, create, updateById, deleteById, getCount};