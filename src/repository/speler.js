const {getKnex, tables} = require('../data/index');
const {getLogger} = require('../core/logging');

const SELECT_COLUMNS = [
  `${tables.speler}.spelerId`, 'auth0id', `${tables.speler}.naam`, 'gewicht', 'lengte', 'positie', 'geboortedatum',
  `${tables.team}.teamId`, `${tables.team}.naam as teamnaam`
];

const formatSpeler = ({teamId, teamnaam, ...rest}) => ({
  ...rest,
  team: {
    teamId,
    naam: teamnaam
  }
});

const getAll = async () => {
  return await getKnex() (tables.speler)
  .select()
  .orderBy('naam', 'asc');
};

const getById = async(spelerId) => {
  const speler = await getKnex() (tables.speler)
  .first(SELECT_COLUMNS)
  .join(`${tables.team}`, `${tables.team}.teamId`, '=',`${tables.speler}.teamId`)
  .where(`${tables.speler}.spelerId`, spelerId);
  return speler && formatSpeler(speler);
  // alleen als speler gevonden wordt, geformateerd
};

const findByAuth0Id = async (auth0id) => {
  return await getKnex()(tables.speler)
    .where('auth0id', auth0id)
    .first();
};


const create = async({naam, gewicht, lengte, positie, geboortedatum, teamId, auth0id}) => {
  try {
    const [spelerId] = await getKnex() (tables.speler)
    .insert({
      naam,
      gewicht,
      lengte,
      positie,
      geboortedatum,
      teamId,
      auth0id});
    return spelerId;
  } catch (error) {
    const logger = getLogger();
    logger.error('creation failed', {error});
    throw error;
  }
};

const updateById = async (spelerdId, {naam, gewicht, lengte, positie, geboortedatum, teamId, auth0id}) => {
  try {
    await getKnex() (tables.speler)
    .update({
      naam,
      gewicht,
      lengte,
      positie,
      geboortedatum,
      teamId,
      auth0id
    })
    .where('spelerId', spelerdId);
    return await getById(spelerdId);
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in updateById', {error});
    throw error;
  }
};

const deleteById = async (spelerId) => {
  const rowsAffected = await getKnex() (tables.speler)
  .where('spelerId', spelerId)
  .del();
  return rowsAffected > 0;
};

const getCount = async () => {
  const [count] = await getKnex() (tables.speler).count();
  return count['COUNT(*)'];
};

module.exports = {getAll, getById, create, updateById, deleteById, getCount, findByAuth0Id};