const Router = require('@koa/router');
const {
  hasPermission,
  permissions,
  addUserInfo,
} = require('../core/auth');
const spelerService = require('../service/speler');
const Joi = require('joi');
const validate = require('./_validation');

/**
 * @openapi
 * tags:
 *   name: Spelers
 *   description: Represents a player in the system that is part of a team.
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Speler:
 *       allOf:
 *         - $ref: "#/components/schemas/Base"
 *         - type: object
 *           required:
 *             - naam
 *             - gewicht
 *             - lengte
 *             - positie
 *             - geboortedatum
 *             - auth0id
 *             - team
 *           properties:
 *             naam:
 *               type: "string"
 *             gewicht:
 *               type: "number"
 *               format: "float"
 *             lengte:
 *               type: "number"
 *               format: "float"
 *             positie:
 *               type: "string"
 *             geboortedatum:
 *               type: "string"
 *               format: date-time
 *             auth0id:
 *               type: "string"
 *             team:
 *               $ref: "#/components/schemas/Team"
 *           example:
 *             $ref: "#/components/examples/Speler"
 *     SpelersList:
 *       allOf:
 *         - $ref: "#/components/schemas/ListResponse"
 *         - type: object
 *           required:
 *             - items
 *           properties:
 *             items:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Speler"
 *   examples:
 *     Speler:
 *       spelerId: 1
 *       gewicht: 84.1
 *       lengte: 1843
 *       positie: Forward
 *       geboortedatum: "2002-05-28T14:27:32.534Z"
 *       auth0id: auth0|63a4cfbddd84a45a70f91a40
 *       team:
 *         $ref: "#/components/examples/Team"
 *   requestBodies:
 *     Speler:
 *       description: The player info to save.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               naam:
 *                 type: string
 *               gewicht:
 *                 type: number
 *                 format: float
 *               lengte:
 *                 type: number
 *                 format: float
 *               positie:
 *                 type: string
 *               geboortedatum:
 *                 type: string
 *                 format: "date-time"
 *               auth0id:
 *                 type: string
 *               teamId:
 *                 type: integer
 *                 format: int32
 */

/**
 * @openapi
 * /api/spelers:
 *   get:
 *     summary: Get all players
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Spelers
 *     responses:
 *       200:
 *         description: List of players
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SpelersList"
 */

const getSpelers = async(ctx) => {
  ctx.body = await spelerService.getAll();
};
getSpelers.validationScheme = null;

/**
 * @openapi
 * /api/spelers:
 *   post:
 *     summary: Create a new player
 *     description: Creates a new player.
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Spelers
 *     requestBody:
 *       $ref: "#/components/requestBodies/Speler"
 *     responses:
 *       200:
 *         description: The created Player
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Speler"
 *       400:
 *         description: You provided invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/400BadRequest'
 *       404:
 *         description: No team with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const createSpeler = async(ctx) => {
  await addUserInfo(ctx);
  ctx.body = await spelerService.register({
    auth0id: ctx.state.user.sub,
    naam: ctx.state.user.name,
    ...ctx.request.body,
    geboortedatum: new Date(ctx.request.body.geboortedatum)
  });
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

/**
 * @openapi
 * /api/spelers/{id}:
 *   get:
 *     summary: Get a single player
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Spelers
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: The requested player
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Speler"
 *       403:
 *         description: You can only request your own information unless you're an admin.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/403Forbidden'
 *       404:
 *         description: No player with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const getSpelerById = async(ctx) => {
  ctx.body = await spelerService.getById(ctx.params.id); // id niet geparsed
};
getSpelerById.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  }
};

/**
 * @openapi
 * /api/spelers/{id}:
 *   delete:
 *     summary: Delete a player
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Spelers
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       204:
 *         description: No response, the delete was successful
 *       403:
 *         description: You can only update your own information unless you're an admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/403Forbidden'
 *       404:
 *         description: No player with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const deleteSpeler = async(ctx) => {
await spelerService.deleteById(ctx.params.id);
ctx.status = 204;
};
deleteSpeler.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  }
};

/**
 * @openapi
 * /api/spelers/{id}:
 *   put:
 *     summary: Update an existing player
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Spelers
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: The updated player
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Speler"
 *       403:
 *         description: You can only update your own information unless you're an admin.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/403Forbidden'
 *       404:
 *         description: No player with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

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

