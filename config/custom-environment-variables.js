module.exports = {
  env: 'NODE_ENV',
  port: 'PORT',
  database: {
    username: 'DATABASE_USERNAME',
    password: 'DATABASE_PASSWORD'
  },
  auth: {
    jwksUri: 'AUTH_JWKS_URI',
    audience: 'AUTH_AUDIENCE',
    issuer: 'AUTH_ISSUER',
    userInfo: 'AUTH_USER_INFO'
  }
};