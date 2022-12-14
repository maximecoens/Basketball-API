const Router = require('@koa/router');
const spelerService = require('../service/speler');

const getSpelers = async(ctx) => {
  ctx.body = await spelerService.getAll();
};

const createSpeler = async(ctx) => {
ctx.body = await spelerService.create({
  ...ctx.request.body,
  geboortedatum: new Date(ctx.request.body.geboortedatum)
  }); // wat men meegeeft destructioning
ctx.status = 201;
};

const getSpelerById = async(ctx) => {
ctx.body = await spelerService.getById(ctx.params.id); // id niet geparsed
};

const deleteSpeler = async(ctx) => {
await spelerService.deleteById(ctx.params.id);
ctx.status = 204; // no content
};

const updateSpeler = async(ctx) => {
ctx.body = await spelerService.updateById(ctx.params.id, 
  {...ctx.request.body, geboortedatum: new Date(ctx.request.body.geboortedatum)});
};

module.exports = (app) => {
  const router = new Router({prefix: '/spelers'});

  router.get('/', getSpelers);
  router.get('/:id', getSpelerById);
  router.post('/', createSpeler);
  router.put('/:id', updateSpeler);
  router.delete('/:id', deleteSpeler);

  app
    .use(router.routes())
    .use(router.allowedMethods()); // juiste foutmelingen enzo zie documentatie

}

