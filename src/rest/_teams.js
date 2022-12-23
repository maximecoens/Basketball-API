const Router = require('@koa/router');
const teamService = require('../service/team');
const Joi = require("joi");
const validate = require('./_validation');

const {permissions, hasPermission} = require('../core/auth');

/**
 * @openapi
 * tags:
 *   name: Teams
 *   description: Represents a teams within a club
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Team:
 *       allOf:
 *         - $ref: "#/components/schemas/Base"
 *         - type: object
 *           required:
 *             - naam
 *             - club
 *           properties:
 *             naam:
 *               type: "string"
 *             club:
 *               $ref: "#/components/schemas/Club"
 *           example:
 *             $ref: "#/components/examples/Team"
 *     TeamsList:
 *       allOf:
 *         - $ref: "#/components/schemas/ListResponse"
 *         - type: object
 *           required:
 *             - items
 *           properties:
 *             items:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Team"
 *   examples:
 *     Team:
 *       teamId: 1
 *       naam: "Jeugd Gentson U21A"
 *       club:
 *         $ref: "#/components/examples/Club"
 *   requestBodies:
 *     Team:
 *       description: The team info to save.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               naam:
 *                 type: string
 *               clubId:
 *                 type: integer
 *                 format: int32
 */

/**
 * @openapi
 * /api/teams:
 *   get:
 *     summary: Get all teams
 *     tags:
 *      - Teams
 *     responses:
 *       200:
 *         description: List of teams
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TeamsList"
 */

const getTeams = async(ctx) => {
  ctx.body = await teamService.getAll();
};
getTeams.validationScheme = null;

/**
 * @openapi
 * /api/teams:
 *   post:
 *     summary: Create a new team
 *     description: Creates a new team within a club.
 *     tags:
 *      - Teams
 *     requestBody:
 *       $ref: "#/components/requestBodies/Team"
 *     responses:
 *       200:
 *         description: The created team
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Team"
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

/**
 * @openapi
 * /api/teams/{id}:
 *   get:
 *     summary: Get a single team
 *     tags:
 *      - Teams
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: The requested team
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Team"
 *       404:
 *         description: No team with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const getTeamById = async(ctx) => {
  ctx.body = await teamService.getById(ctx.params.id); // id niet geparsed
};
getTeamById.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  }
};

/**
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     summary: Delete a team
 *     tags:
 *      - Teams
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       204:
 *         description: No response, the delete was successful
 *       404:
 *         description: No team with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const deleteTeam = async(ctx) => {
  await teamService.deleteById(ctx.params.id);
  ctx.status = 204; // no content
};
deleteTeam.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  }
};

/**
 * @openapi
 * /api/teams/{id}:
 *   put:
 *     summary: Update an existing team
 *     tags:
 *      - Teams
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     requestBody:
 *       $ref: "#/components/requestBodies/Team"
 *     responses:
 *       200:
 *         description: The updated team
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Team"
 *       400:
 *         description: You provided invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/400BadRequest'
 *       404:
 *         description: No team/club with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

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