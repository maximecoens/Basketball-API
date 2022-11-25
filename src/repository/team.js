const {getKnex, tables} = require('../data/index');
const {getLogger} = require('../core/logging');

const SELECT_COLUMNS = [
  `${tables.team}.teamId`, 'leeftijdscategorie',
  `${tables.club}.clubId`, `${tables.club}.naam`, `${tables.club}.hoofdsponsor`, 
  `${tables.club}.voorzitter`, `${tables.club}.locatie`
];

const formatTeam = ({clubId, naam, hoofdsponsor, voorzitter, locatie, ...rest}) => ({
  ...rest,
  club: {
    clubId,
    naam,
    hoofdsponsor,
    voorzitter,
    locatie
  }
});

const getAll = async () => {
  return await getKnex() (tables.team)
  .select('teamId', 'leeftijdscategorie', `${tables.team}.clubId`, `${tables.club}.naam as clubnaam`)
  .join(`${tables.club}`, `${tables.club}.clubId`, '=', `${tables.team}.clubId`);
};

const getById = async (teamId) => {
  const team = await getKnex() (tables.team)
  .where('teamId', teamId)
  .first(SELECT_COLUMNS)
  .join(`${tables.club}`, `${tables.club}.clubId`, '=', `${tables.team}.clubId`);
  return team && formatTeam(team);
};

const create = async ({leeftijdscategorie, clubId}) => {
  try {
    const [teamId] = await getKnex() (tables.team)
    .insert({
      leeftijdscategorie,
      clubId
    });
    return await getById(teamId);
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in create', {error});
    throw error;
  }
};

const updateById = async (teamId, {leeftijdscategorie, clubId}) => {
  try {
    await getKnex() (tables.team)
    .update({
      leeftijdscategorie,
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
  await getKnex() (tables.team)
  .where('teamId', teamId)
  .del();
};

module.exports = {getAll, getById, create, updateById, deleteById};