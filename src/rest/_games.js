const Router = require('@koa/router');
const gameService = require('../service/game');
const Joi = require('joi');
const validate = require('./_validation');

const getGames = async(ctx) => {
  ctx.body = await gameService.getAll();
};
getGames.validationScheme = null;

const createGame = async(ctx) => {
ctx.body = await gameService.create({
  ...ctx.request.body,
  datum: new Date(ctx.request.body.datum)
  }); // wat men meegeeft destructioning
  ctx.status = 201;
};

createGame.validationScheme = {
  body: {
    locatie: Joi.string().max(255),
    scoreThuis: Joi.number().integer().positive(),
    scoreUit: Joi.number().integer().positive(),
    datum: Joi.date().iso().less('now'),
    thuisTeamId: Joi.number().integer().positive(),
    uitTeamId: Joi.number().integer().positive()
  }
};

const getGameById = async(ctx) => {
ctx.body = await gameService.getById(ctx.params.id); // id niet geparsed
};

getGameById.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  }
};

const deleteGame = async(ctx) => {
await gameService.deleteById(ctx.params.id);
ctx.status = 204; // no content
};

deleteGame.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  }
};

const updateGame = async(ctx) => {
ctx.body = await gameService.updateById(ctx.params.id, 
  {...ctx.request.body, datum: new Date(ctx.request.body.datum)});
};

updateGame.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  },
  body: {
    locatie: Joi.string().max(255),
    scoreThuis: Joi.number().integer().positive(),
    scoreUit: Joi.number().integer().positive(),
    datum: Joi.date().iso().less('now'),
    thuisTeamId: Joi.number().integer().positive(),
    uitTeamId: Joi.number().integer().positive()
  }
};

module.exports = (app) => {
  const router = new Router({prefix: '/games'});

  router.get('/', validate(getGames.validationScheme), getGames);
  router.get('/:id', validate(getGameById.validationScheme), getGameById);
  router.post('/', validate(createGame.validationScheme), createGame);
  router.put('/:id', validate(updateGame.validationScheme), updateGame);
  router.delete('/:id', validate(deleteGame.validationScheme), deleteGame);

  app
    .use(router.routes())
    .use(router.allowedMethods()); // juiste foutmelingen enzo zie documentatie

}

