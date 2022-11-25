const {getKnex, tables} = require('../data/index');
const {getLogger} = require('../core/logging');

const SELECT_COLUMNS = [
  `${tables.speler}.spelerId`, 'naam', 'gewicht', 'lengte', 'positie', 'geboortedatum',
  `${tables.team}.teamId`, `${tables.team}.leeftijdscategorie`
];

const formatSpeler = ({teamId, leeftijdscategorie, ...rest}) => ({
  ...rest,
  team: {
    teamId,
    leeftijdscategorie
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

const create = async({naam, gewicht, lengte, positie, geboortedatum, teamId}) => {
  try {
    const [spelerId] = await getKnex() (tables.speler)
    .insert({
      naam,
      gewicht,
      lengte,
      positie,
      geboortedatum,
      teamId});
    return await getById(spelerId);
  } catch (error) {
    getLogger.error('creation failed', {error});
    throw new Error('creation failed');
  }
};

const updateById = async (spelerdId, {naam, gewicht, lengte, positie, geboortedatum, teamId}) => {
  try {
    await getKnex() (tables.speler)
    .update({
      naam,
      gewicht,
      lengte,
      positie,
      geboortedatum,
      teamId
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
  await getKnex() (tables.speler)
  .where('spelerId', spelerId)
  .del();
};

module.exports = {getAll, getById, create, updateById, deleteById};