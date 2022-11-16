const Router = require('@koa/router');
const spelerService = require('../service/speler');

const getSpelers = async(ctx) => {
  ctx.body = spelerService.getAll();
};

const createSpeler = async(ctx) => {
ctx.body = spelerService.create({...ctx.request.body}); // wat men meegeeft destructioning
};

const getSpelerById = async(ctx) => {
ctx.body = spelerService.getById(ctx.params.id); // id niet geparsed
};

const deleteSpeler = async(ctx) => {
spelerService.deleteById(ctx.params.id);
ctx.status = 204; // no content
};

const updateSpeler = async(ctx) => {
ctx.body = spelerService.updateById(ctx.params.id, {...ctx.request.body});
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

