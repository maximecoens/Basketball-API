const { http } = require("winston");

module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Basket API with Swagger',
      version: '0.1.0',
      description: 'This is a simple CRUD API application made with Koa and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'SportAPI',
        url: 'https://hogent.be',
        email: 'maxime.coens@student.hogent.be',
      },
    },
    servers: [{
      url: 'http://localhost:9000/',
    }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [ { 
      Bearer: [] 
    } ],
  },
  apis: ['./src/rest/*.js'],
};