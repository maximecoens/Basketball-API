const Router = require('@koa/router');
const clubService = require('../service/club');
const {
  hasPermission,
  permissions,
} = require('../core/auth');
const Joi = require('joi');
const validate = require('./_validation');

const getClubs = async(ctx) => {
  ctx.body = await clubService.getAll();
};
getClubs.validationScheme = null;

const createClub = async(ctx) => {
  ctx.body = await clubService.create({...ctx.request.body});
  ctx.status = 201;
};

createClub.validationScheme = {
  body: {
    naam: Joi.string().max(255),
    voorzitter: Joi.string().max(255),
    hoofdsponsor: Joi.string().max(255),
    locatie: Joi.string().max(255)
  }
};

const getClubById = async (ctx) => {
  ctx.body = await clubService.getById(ctx.params.id);
};

getClubById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive()
  })
};

const deleteClub = async (ctx) => {
  await clubService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteClub.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  }
};

const updateClub = async (ctx) => {
  ctx.body = await clubService.updateById(ctx.params.id, {...ctx.request.body})
};

updateClub.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  },
  body: {
    naam: Joi.string().max(255),
    voorzitter: Joi.string().max(255),
    hoofdsponsor: Joi.string().max(255),
    locatie: Joi.string().max(255)
  }
};

module.exports = (app) => {
  const router = new Router({prefix: '/clubs'});
  
  router.get('/', hasPermission(permissions.loggedIn), validate(getClubs.validationScheme), getClubs);
  router.get('/:id', hasPermission(permissions.read), validate(getClubById.validationScheme), getClubById); // eerst validatie vindt plaats daarna naar endpoint gestuurd
  router.post('/', hasPermission(permissions.write), validate(createClub.validationScheme), createClub);
  router.put('/:id', hasPermission(permissions.write), validate(updateClub.validationScheme), updateClub);
  router.delete('/:id', hasPermission(permissions.write), validate(deleteClub.validationScheme), deleteClub);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};