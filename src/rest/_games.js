const Router = require('@koa/router');
const gameService = require('../service/game');

const getGames = async(ctx) => {
  ctx.body = await gameService.getAll();
};

const createGame = async(ctx) => {
ctx.body = await gameService.create({
  ...ctx.request.body,
  datum: new Date(ctx.request.body.datum)
  }); // wat men meegeeft destructioning
  ctx.status = 201;
};

const getGameById = async(ctx) => {
ctx.body = await gameService.getById(ctx.params.id); // id niet geparsed
};

const deleteGame = async(ctx) => {
await gameService.deleteById(ctx.params.id);
ctx.status = 204; // no content
};

const updateGame = async(ctx) => {
ctx.body = await gameService.updateById(ctx.params.id, 
  {...ctx.request.body, datum: new Date(ctx.request.body.datum)});
};

module.exports = (app) => {
  const router = new Router({prefix: '/games'});

  router.get('/', getGames);
  router.get('/:id', getGameById);
  router.post('/', createGame);
  router.put('/:id', updateGame);
  router.delete('/:id', deleteGame);

  app
    .use(router.routes())
    .use(router.allowedMethods()); // juiste foutmelingen enzo zie documentatie

}

