const {tables} = require('../index');

module.exports = {
  up: async(knex) => {
    await knex.schema.createTable(tables.team, (table) => {
      table.increments('teamId');
      table.string('naam', 255).notNullable();
      table.integer('clubId').unsigned().notNullable();

      table.foreign('clubId', 'fk_team_club')
      .references(`${tables.club}.clubId`)
      .onDelete('CASCADE');
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.team);
  }
};