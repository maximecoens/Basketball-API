module.exports = {
  port: 9000,
  log : {
    level: 'info',
    disabled: false
  },
  cors: {
    origins: ['http://localhost:3000'],
    maxAge: 3 * 60 * 60,
  },
  database: {
    host : 'DATABASE_HOST',
    port : 'DATABASE_PORT',
    database : 'DATABASE_DATABASE',
    client: 'DATABASE_CLIENT'
  }
}