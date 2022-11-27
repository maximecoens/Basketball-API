const {tables} = require('../index');

module.exports = {
  up: async(knex) => {
    // tables clubs creeert
    await knex.schema.createTable(tables.speler, (table) => {
      table.increments('spelerId');
      table.string('naam', 255).notNullable();
      table.float('gewicht').notNullable();
      table.float('lengte').notNullable();
      table.string('positie', 255).notNullable();
      table.dateTime('geboortedatum').notNullable();
      table.integer('teamId').unsigned().notNullable();

      table.foreign('teamId', 'fk_speler_team')
      .references(`${tables.team}.teamId`)
      .onDelete('CASCADE');

      table.unique('naam', 'unique_index_spelers_naam')
    });
  },
  down: (knex) => {
    // table clubs terug verwijderen
    return knex.schema.dropTableIfExists(tables.speler);
  }
};