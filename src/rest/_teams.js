const Router = require('@koa/router');
const teamService = require('../service/team');
const Joi = require("joi");
const validate = require('./_validation');

const {permissions, hasPermission} = require('../core/auth');

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

  router.get('/', hasPermission(permissions.read), validate(getTeams.validationScheme), getTeams);
  router.get('/:id', hasPermission(permissions.read), validate(getTeamById.validationScheme), getTeamById);
  router.post('/', hasPermission(permissions.write), validate(createTeam.validationScheme), createTeam);
  router.put('/:id', hasPermission(permissions.write), validate(updateTeam.validationScheme), updateTeam);
  router.delete('/:id', hasPermission(permissions.write), validate(deleteTeam.validationScheme), deleteTeam);

  app
    .use(router.routes())
    .use(router.allowedMethods()); // juiste foutmelingen enzo zie documentatie

};