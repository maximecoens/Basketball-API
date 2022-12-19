const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.alterTable(tables.speler, (table) => {
      table.string('auth0id', 255)
        .notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.speler);
  },
};
