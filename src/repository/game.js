const {getKnex, tables} = require('../data/index');
const {getLogger} = require('../core/logging');

const SELECT_COLUMNS = [
  `${tables.game}.gameId`, `${tables.game}.locatie`, 'scoreThuis',
  'scoreUit', 'datum', 
  'thuis.teamId', 'thuis.naam as thuisTeamNaam',
  'uit.teamId', 'uit.naam as uitTeamNaam',
  'thuisClub.naam as thuisClubNaam', 'uitClub.naam as uitClubNaam'
];

const formatGame = ({thuisTeamId, uitTeamId, thuisTeamNaam, uitTeamNaam, thuisClubNaam, uitClubNaam,...rest}) => ({
  ...rest,
  thuisTeam: {
    thuisTeamId,
    naam: thuisTeamNaam,
    clubnaam: thuisClubNaam
  },
  uitTeam: {
    uitTeamId,
    naam: uitTeamNaam,
    clubnaam: uitClubNaam
  }
});

const getAll = async () => {
  return await getKnex() (tables.game)
  .select();
};

const getById = async (gameId) => {
  const game = await getKnex() (tables.game)
  .first(SELECT_COLUMNS)
  .where('gameId', gameId)
  .join(`${tables.team} as thuis`, 'thuis.teamId', '=', `${tables.game}.thuisTeamId`)
  .join(`${tables.club} as thuisClub`, 'thuisClub.clubId', '=', 'thuis.clubId')
  .join(`${tables.team} as uit`, 'uit.teamId', '=', `${tables.game}.uitTeamId`)
  .join(`${tables.club} as uitClub`, 'uitClub.clubId', '=', 'uit.clubId');
  return game && formatGame(game);
};

const create = async ({locatie, scoreThuis, scoreUit, datum, thuisTeamId, uitTeamId}) => {
  try {
    const [gameId] = await getKnex() (tables.game)
    .insert({
      locatie,
      scoreThuis,
      scoreUit,
      datum,
      thuisTeamId,
      uitTeamId
    });
    return gameId;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in create', {error});
    throw error;
  }
};

const updateById = async (gameId, {locatie, scoreThuis, scoreUit, datum, thuisTeamId, uitTeamId}) => {
  try {
    await getKnex() (tables.game)
    .update({
      locatie,
      scoreThuis,
      scoreUit,
      datum,
      thuisTeamId,
      uitTeamId
    })
    .where('gameId', gameId);
    return await getById(gameId);
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in updateById', {error});
    throw error;
  }
};

const deleteById = async (gameId) => {
  const rowsAffected = await getKnex() (tables.game)
  .where('gameId', gameId)
  .del();
  return rowsAffected > 0;
};

const getCount = async () => {
  const [count] = await getKnex() (tables.game).count();
  return count['COUNT(*)'];
};

module.exports = {getAll, getById, create, updateById, deleteById, getCount};