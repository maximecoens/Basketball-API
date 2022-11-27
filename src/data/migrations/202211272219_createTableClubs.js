const {tables} = require('../index.js');

module.exports = {
  up: async(knex) => {
    //kolom kampioenschappen wordt toegevoegd aan te tabel clubs
    await knex.schema.alterTable(tables.club, (table) => {
      table.integer('kampioenschappen').nullable(); // kan notNullable als er een default is
    })
  },
  down: (knex) => {
    // kolom kamp... terug verwijderd
    knex.schema.alterTable(tables.club, (table) => {
      table.dropColumn('kampioenschappen');
    })
  }
};
