const Router = require('@koa/router');
const teamService = require('../service/team');

const getTeams = async(ctx) => {
  ctx.body = await teamService.getAll();
}

const createTeam = async(ctx) => {
  ctx.body = await teamService.create({...ctx.request.body}); // wat men meegeeft destructioning
  ctx.status = 201;
};

const getTeamById = async(ctx) => {
  ctx.body = await teamService.getById(ctx.params.id); // id niet geparsed

};

const deleteTeam = async(ctx) => {
  await teamService.deleteById(ctx.params.id);
  ctx.status = 204; // no content
};

const updateTeam = async(ctx) => {
  ctx.body = await teamService.updateById(ctx.params.id, {...ctx.request.body});
};

module.exports = (app) => {
  const router = new Router({prefix: '/teams'});

  router.get('/', getTeams);
  router.get('/:id', getTeamById);
  router.post('/', createTeam);
  router.put('/:id', updateTeam);
  router.delete('/:id', deleteTeam);

  app
    .use(router.routes())
    .use(router.allowedMethods()); // juiste foutmelingen enzo zie documentatie

}