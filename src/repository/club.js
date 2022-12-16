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
    return clubId;
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
  const rowsAffected = await getKnex() (tables.club)
  .where('clubId', clubId)
  .del();
  return rowsAffected > 0;
};

const getCount = async () => {
  const [count] = await getKnex() (tables.club).count();
  return count['COUNT(*)'];
};


module.exports = {getAll, getById, create, updateById, deleteById, getCount};