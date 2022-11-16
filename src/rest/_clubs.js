const Router = require('@koa/router');
const clubService = require('../service/club');

const getClubs = async(ctx) => {
  ctx.body = clubService.getAll();
}

const createClub = async(ctx) => {
  ctx.body = clubService.create({...ctx.request.body});
}

const getClubById = async (ctx) => {
  ctx.body = clubService.getById(ctx.params.id);
}

const deleteClub = async (ctx) => {
  clubService.deleteById(ctx.params.id);
  ctx.status = 204;
}

const updateClub = async (ctx) => {
  ctx.body = clubService.updateById(ctx.params.id, {...ctx.request.body})
}

module.exports = (app) => {
  const router = new Router({prefix: '/clubs'});
  
  router.get('/', getClubs);
  router.get('/:id', getClubById);
  router.post('/', createClub);
  router.put('/:id', updateClub);
  router.delete('/:id', deleteClub);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}