const Router = require('@koa/router');
const teamService = require('../service/team');
const Joi = require("joi");
const validate = require('./_validation');

const getTeams = async(ctx) => {
  ctx.body = await teamService.getAll();
};
getTeams.validationScheme = null;

const createTeam = async(ctx) => {
  ctx.body = await teamService.create({...ctx.request.body}); // wat men meegeeft destructioning
  ctx.status = 201;
};
createTeam.validationScheme = {
  body: {
    naam: Joi.string().max(255),
    clubId: Joi.number().integer().positive(),
  }
};

const getTeamById = async(ctx) => {
  ctx.body = await teamService.getById(ctx.params.id); // id niet geparsed
};
getTeamById.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  }
};

const deleteTeam = async(ctx) => {
  await teamService.deleteById(ctx.params.id);
  ctx.status = 204; // no content
};
deleteTeam.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  }
};

const updateTeam = async(ctx) => {
  ctx.body = await teamService.updateById(ctx.params.id, {...ctx.request.body});
};

updateTeam.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  },
  body: {
    naam: Joi.string().max(255),
    clubId: Joi.number().integer().positive()
  }
};

module.exports = (app) => {
  const router = new Router({prefix: '/teams'});

  router.get('/', validate(getTeams.validationScheme), getTeams);
  router.get('/:id', validate(getTeamById.validationScheme), getTeamById);
  router.post('/', validate(createTeam.validationScheme), createTeam);
  router.put('/:id', validate(updateTeam.validationScheme), updateTeam);
  router.delete('/:id', validate(deleteTeam.validationScheme), deleteTeam);

  app
    .use(router.routes())
    .use(router.allowedMethods()); // juiste foutmelingen enzo zie documentatie

}