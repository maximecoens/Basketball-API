const {tables} = require('../index');

module.exports = {
  up: async(knex) => {
    await knex.schema.createTable(tables.game, (table) => {
      table.increments('gameId');
      table.string('locatie', 255).notNullable();
      table.integer('scoreThuis').notNullable();
      table.integer('scoreUit').notNullable();
      table.dateTime('datum').notNullable();
      table.integer('thuisTeamId').unsigned().notNullable();
      table.integer('uitTeamId').unsigned().notNullable();
      
      table.foreign('thuisTeamId', 'fk_game_thuisTeam')
      .references(`${tables.team}.teamId`)
      .onDelete('CASCADE');
      table.foreign('uitTeamId', 'fk_game_uitTeam')
      .references(`${tables.team}.teamId`)
      .onDelete('CASCADE');
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.game);
  }
};