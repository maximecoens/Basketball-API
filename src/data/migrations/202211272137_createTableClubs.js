const {tables} = require('../index');

module.exports = {
  up: async(knex) => {
    // tables clubs creeert
    await knex.schema.createTable(tables.club, (table) => {
      table.increments('clubId');
      table.string('naam', 255).notNullable();
      table.string('hoofdsponsor', 255).notNullable();
      table.string('voorzitter', 255).notNullable();
      table.string('locatie', 255).notNullable();

      table.unique('naam', 'unique_index_clubs_naam')
    });
  },
  down: (knex) => {
    // table clubs terug verwijderen
    return knex.schema.dropTableIfExists(tables.club);
  }
};