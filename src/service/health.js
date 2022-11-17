const packageJSON = require('../../package.json');

const ping = () => ({pong: true});

// naam en versie, later connectie met db, ...
const getVersion = () => ({
  version: packageJSON.version,
  name: packageJSON.name,
  env: process.env.NODE_ENV
});

module.exports = {ping, getVersion};