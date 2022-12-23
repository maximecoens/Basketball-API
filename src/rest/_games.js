const Router = require('@koa/router');
const gameService = require('../service/game');
const {
  hasPermission,
  permissions,
} = require('../core/auth');
const Joi = require('joi');
const validate = require('./_validation');

/**
 * @openapi
 * tags:
 *   name: Games
 *   description: Represents a game played between two teams.
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Game:
 *       allOf:
 *         - $ref: "#/components/schemas/Base"
 *         - type: object
 *           required:
 *             - locatie
 *             - scoreThuis
 *             - scoreUit
 *             - datum
 *             - thuisTeam
 *             - uitTeam
 *           properties:
 *             locatie:
 *               type: "string"
 *             scoreThuis:
 *               type: "integer"
 *             scoreUit:
 *               type: "integer"
 *             datum:
 *               type: "string"
 *               format: date-time
 *             thuisTeam:
 *               $ref: "#/components/schemas/Team"
 *             uitTeam:
 *               $ref: "#/components/schemas/Team"
 *           example:
 *             $ref: "#/components/examples/Game"
 *     GamesList:
 *       allOf:
 *         - $ref: "#/components/schemas/ListResponse"
 *         - type: object
 *           required:
 *             - items
 *           properties:
 *             items:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Game"
 *   examples:
 *     Game:
 *       gameId: 1
 *       locatie: Henleykaai 48, Gent
 *       scoreThuis: 68
 *       scoreUit: 53
 *       datum: "2021-05-28T14:27:32.534Z"
 *       thuisTeam:
 *         $ref: "#/components/examples/Team"
 *       uitTeam:
 *         $ref: "#/components/examples/Team"
 *   requestBodies:
 *     Game:
 *       description: The game info to save.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               locatie:
 *                 type: string
 *               scoreThuis:
 *                 type: integer
 *               scoreUit:
 *                 type: integer
 *               datum:
 *                 type: string
 *                 format: "date-time"
 *               thuisTeamId:
 *                 type: integer
 *                 format: int32
 *               uitTeamId:
 *                 type: integer
 *                 format: int32
 */

/**
 * @openapi
 * /api/games:
 *   get:
 *     summary: Get all games
 *     tags:
 *      - Games
 *     responses:
 *       200:
 *         description: List of games
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GamesList"
 */

const getGames = async(ctx) => {
  ctx.body = await gameService.getAll();
};
getGames.validationScheme = null;

const createGame = async(ctx) => {
ctx.body = await gameService.create({
  ...ctx.request.body,
  datum: new Date(ctx.request.body.datum)
  }); // wat men meegeeft destructioning
  ctx.status = 201;
};

/**
 * @openapi
 * /api/games:
 *   post:
 *     summary: Create a new game
 *     description: Creates a new game between two teams.
 *     tags:
 *      - Games
 *     requestBody:
 *       $ref: "#/components/requestBodies/Game"
 *     responses:
 *       200:
 *         description: The created game
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Game"
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

createGame.validationScheme = {
  body: {
    locatie: Joi.string().max(255),
    scoreThuis: Joi.number().integer().positive(),
    scoreUit: Joi.number().integer().positive(),
    datum: Joi.date().iso().less('now'),
    thuisTeamId: Joi.number().integer().positive(),
    uitTeamId: Joi.number().integer().positive()
  }
};

/**
 * @openapi
 * /api/games/{id}:
 *   get:
 *     summary: Get a single game
 *     tags:
 *      - Games
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: The requested game
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Game"
 *       404:
 *         description: No game with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const getGameById = async(ctx) => {
ctx.body = await gameService.getById(ctx.params.id);
};

getGameById.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  }
};

/**
 * @openapi
 * /api/games/{id}:
 *   delete:
 *     summary: Delete a game
 *     tags:
 *      - Games
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       204:
 *         description: No response, the delete was successful
 *       404:
 *         description: No game with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const deleteGame = async(ctx) => {
await gameService.deleteById(ctx.params.id);
ctx.status = 204; // no content
};

deleteGame.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  }
};

/**
 * @openapi
 * /api/games/{id}:
 *   put:
 *     summary: Update an existing game
 *     tags:
 *      - Games
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     requestBody:
 *       $ref: "#/components/requestBodies/Game"
 *     responses:
 *       200:
 *         description: The updated game
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Game"
 *       400:
 *         description: You provided invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/400BadRequest'
 *       404:
 *         description: No thuisTeam/uitTeam with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const updateGame = async(ctx) => {
ctx.body = await gameService.updateById(ctx.params.id, 
  {...ctx.request.body, datum: new Date(ctx.request.body.datum)});
};

updateGame.validationScheme = {
  params: {
    id: Joi.number().integer().positive()
  },
  body: {
    locatie: Joi.string().max(255),
    scoreThuis: Joi.number().integer().positive(),
    scoreUit: Joi.number().integer().positive(),
    datum: Joi.date().iso().less('now'),
    thuisTeamId: Joi.number().integer().positive(),
    uitTeamId: Joi.number().integer().positive()
  }
};

module.exports = (app) => {
  const router = new Router({prefix: '/games'});

  router.get('/', hasPermission(permissions.read), validate(getGames.validationScheme), getGames);
  router.get('/:id', hasPermission(permissions.read), validate(getGameById.validationScheme), getGameById);
  router.post('/', hasPermission(permissions.write), validate(createGame.validationScheme), createGame);
  router.put('/:id', hasPermission(permissions.write), validate(updateGame.validationScheme), updateGame);
  router.delete('/:id', hasPermission(permissions.write), validate(deleteGame.validationScheme), deleteGame);

  app
    .use(router.routes())
    .use(router.allowedMethods()); // juiste foutmelingen enzo zie documentatie

}

