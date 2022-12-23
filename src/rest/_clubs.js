const Router = require('@koa/router');
const clubService = require('../service/club');
const {
  hasPermission,
  permissions,
} = require('../core/auth');
const Joi = require('joi');
const validate = require('./_validation');

/**
 * 
 * @openapi
 * tags:
 *   name: Clubs
 *   description: Represents a basketballclub 
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Club:
 *       allOf:
 *         - $ref: "#/components/schemas/Base"
 *         - type: object
 *           required:
 *             - clubId
 *             - naam
 *             - hoofdsponsor
 *             - voorzitter
 *             - locatie
 *             - kampioenschappen
 *           properties:
 *             naam:
 *               type: "string"
 *             hoofdsponsor:
 *               type: "string"
 *             voorzitter:
 *               type: "string"
 *             locatie:
 *               type: "string"
 *             kampioenschappen:
 *               type: "integer"
 *           example:
 *             $ref: "#/components/examples/Club"
 *     ClubsList:
 *       allOf:
 *         - $ref: "#/components/schemas/ListResponse"
 *         - type: object
 *           required:
 *             - items
 *           properties:
 *             items:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Club"
 *   examples:
 *     Club:
 *       clubId: 1
 *       naam: Amon Jeugd Gentson
 *       hoofdsponsor: Amon
 *       voorzitter: Jan Janssens
 *       locatie: Henleykaar 48, Gent
 *   requestBodies:
 *     Club:
 *       description: The club info to save
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                naam:
 *                  type: string
 *                hoofdsponsor:
 *                  type: string
 *                voorzitter:
 *                  type: string
 *                locatie:
 *                  type: string
 *                kampioenschappen:
 *                  type: integer
 *             required:
 *               - naam
 *               - hoofdsponsor
 *               - voorzitter
 *               - locatie
 */

/**
 * @openapi
 * /api/clubs:
 *   get:
 *     summary: Get all clubs
 *     tags:
 *      - Clubs
 *     responses:
 *       200:
 *         description: List of clubs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ClubsList"
 */

const getClubs = async(ctx) => {
  ctx.body = await clubService.getAll();
};
getClubs.validationScheme = null;

/**
 * @openapi
 * /api/clubs:
 *   post:
 *     summary: Create a new club
 *     description: Creates a new club.
 *     tags:
 *      - Clubs
 *     requestBody:
 *       $ref: "#/components/requestBodies/Club"
 *     responses:
 *       200:
 *         description: The created club
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Club"
 *       400:
 *         description: You provided invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/400BadRequest'
 */

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

/**
 * @openapi
 * /api/clubs/{id}:
 *   get:
 *     summary: Get a single club
 *     tags:
 *      - Clubs
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: The requested club
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Club"
 *       404:
 *         description: No club with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const getClubById = async (ctx) => {
  ctx.body = await clubService.getById(ctx.params.id);
};

getClubById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive()
  })
};

/**
 * @openapi
 * /api/clubs/{id}:
 *   delete:
 *     summary: Delete a club
 *     tags:
 *      - Clubs
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       204:
 *         description: No response, the delete was successful
 *       404:
 *         description: No clubs with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const deleteClub = async (ctx) => {
  await clubService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteClub.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  }
};

/**
 * @openapi
 * /api/clubs/{id}:
 *   put:
 *     summary: Update an existing club
 *     tags:
 *      - Clubs
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     requestBody:
 *       $ref: "#/components/requestBodies/Club"
 *     responses:
 *       200:
 *         description: The updated club
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Club"
 *       400:
 *         description: You provided invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/400BadRequest'
 *       404:
 *         description: No club with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

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