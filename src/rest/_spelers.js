const Router = require('@koa/router');
const {
  hasPermission,
  permissions,
} = require('../core/auth');
const spelerService = require('../service/speler');
const Joi = require('joi');
const validate = require('./_validation');

const getSpelers = async(ctx) => {
  ctx.body = await spelerService.getAll();
};
getSpelers.validationScheme = null;

const createSpeler = async(ctx) => {
ctx.body = await spelerService.create({
  ...ctx.request.body,
  geboortedatum: new Date(ctx.request.body.geboortedatum)
  }); // wat men meegeeft destructioning
ctx.status = 201;
};

createSpeler.validationScheme = {
  body: {
    naam: Joi.string().max(255),
    gewicht: Joi.number().positive(),
    lengte: Joi.number().positive(),
    positie: Joi.string().max(255),
    geboortedatum: Joi.date().iso().less('now'),
    teamId: Joi.number().integer().positive()
  }
};

const getSpelerById = async(ctx) => {
  ctx.body = await spelerService.getById(ctx.params.id); // id niet geparsed
};
getSpelerById.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  }
};

const deleteSpeler = async(ctx) => {
await spelerService.deleteById(ctx.params.id);
ctx.status = 204; // no content
};
deleteSpeler.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  }
};

const updateSpeler = async(ctx) => {
ctx.body = await spelerService.updateById(ctx.params.id, 
  {...ctx.request.body, geboortedatum: new Date(ctx.request.body.geboortedatum)});
};

updateSpeler.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  },
  body: {
    naam: Joi.string().max(255),
    gewicht: Joi.number().positive(),
    lengte: Joi.number().positive(),
    positie: Joi.string().max(255),
    geboortedatum: Joi.date().iso().less('now'),
    teamId: Joi.number().integer().positive()
  }
};

module.exports = (app) => {
  const router = new Router({prefix: '/spelers'});

  router.get('/', hasPermission(permissions.read), validate(getSpelers.validationScheme), getSpelers);
  router.get('/:id', hasPermission(permissions.read), validate(getSpelerById.validationScheme), getSpelerById);
  router.post('/', hasPermission(permissions.write), validate(createSpeler.validationScheme), createSpeler);
  router.put('/:id', hasPermission(permissions.write), validate(updateSpeler.validationScheme), updateSpeler);
  router.delete('/:id', hasPermission(permissions.write), validate(deleteSpeler.validationScheme), deleteSpeler);

  app
    .use(router.routes())
    .use(router.allowedMethods()); // juiste foutmelingen enzo zie documentatie

}

