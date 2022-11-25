const {getKnex, tables} = require('../data/index');
const {getLogger} = require('../core/logging');

const SELECT_COLUMNS = [
  `${tables.club}.clubId`, 'naam', 'hoofdsponsor',
  'voorzitter', 'locatie'
];

const getAll = async () => {
  return await getKnex() (tables.club)
  .select()
  .orderBy('naam', 'asc');
};

const getById = async (clubId) => {
  const club = await getKnex() (tables.club)
  .where('clubId', clubId)
  .first(SELECT_COLUMNS);
  return club;
};

const create = async ({naam, hoofdsponsor, voorzitter, locatie}) => {
  try {
    const [clubId] = await getKnex() (tables.club)
    .insert({
      naam,
      hoofdsponsor,
      voorzitter,
      locatie
    });
    return await getById(clubId);
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in create', {error});
    throw error;
  }
};

const updateById = async (clubId, {naam, hoofdsponsor, voorzitter, locatie}) => {
  try {
    await getKnex() (tables.club)
    .update({
      naam,
      hoofdsponsor, 
      voorzitter,
      locatie,
    })
    .where('clubId', clubId);
    return await getById(clubId);
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in updateById', {error});
    throw error;
  }
};

const deleteById = async (clubId) => {
  await getKnex() (tables.club)
  .where('clubId', clubId)
  .del();
};


module.exports = {getAll, getById, create, updateById, deleteById};