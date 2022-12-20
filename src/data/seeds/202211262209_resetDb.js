const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    // first delete all entries in every table
    await knex(tables.game).delete();
    await knex(tables.team).delete();
    await knex(tables.speler).delete();
    await knex(tables.club).delete();
  },
};