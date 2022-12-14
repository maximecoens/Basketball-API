module.exports = {
  log : {
    level: 'silly',
    disabled: true
  },

  cors: {
    origins: ['http://localhost:3000'],
    maxAge: 3 * 60 * 60,
  },

  database: {
    host : 'localhost',
    port : 3306,
    database : '186204mc_test',
    client: 'mysql2'
  }
};