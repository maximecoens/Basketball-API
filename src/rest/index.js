// alle modules importeren en exporteren wat nodig
const installSpelerRouter = require('./_spelers');
const installClubsRouter = require('./_clubs');
const installTeamsRouter = require('./_teams');
const installGamesRouter = require('./_games');
const installHealthRouter = require('./_health');
const Router = require('@koa/router');

/**
 * @openapi
 * components:
 *   schemas:
 *     Base:
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *           format: "int32"
 *       example:
 *         id: 123
 *     ListResponse:
 *       required:
 *         - count
 *       properties:
 *         count:
 *           type: integer
 *           description: Number of items returned
 *           example: 1
 */

/**
 * @openapi
 * components:
 *   parameters:
 *     idParam:
 *       in: path
 *       name: id
 *       description: Id of the item to fetch/update/delete
 *       required: true
 *       schema:
 *         type: integer
 *         format: "int32"
 */

/**
 * @openapi
 * components:
 *   responses:
 *     404NotFound:
 *       description: The request resource could not be found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - details
 *             properties:
 *               code:
 *                 type: string
 *               details:
 *                 type: string
 *                 description: Extra information about the specific not found error that occured
 *               stack:
 *                 type: string
 *                 description: Stack trace (only available if set in configuration)
 *           example:
 *             code: "NOT_FOUND"
 *             details: "No user with the id 123 exists"
 */

/**
 * @openapi
 * components:
 *   responses:
 *     400BadRequest:
 *       description: You provided invalid data
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - details
 *             properties:
 *               code:
 *                 type: string
 *               details:
 *                 type: string
 *                 description: Extra information about the specific bad request error that occured
 *               stack:
 *                 type: string
 *                 description: Stack trace (only available if set in configuration)
 *           example:
 *             code: "VALIDATION_FAILED"
 *             details: "You can only choose a birthday that is before today's day"
 */

/**
 * @openapi
 * components:
 *   responses:
 *     403Forbidden:
 *       description: You don't have access to this resource
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - details
 *             properties:
 *               code:
 *                 type: string
 *               details:
 *                 type: string
 *                 description: Extra information about the specific forbidden error that occured
 *               stack:
 *                 type: string
 *                 description: Stack trace (only available if set in configuration)
 *           example:
 *             code: "FORBIDDEN"
 *             details: "You are not allowed to view this user's information"
 */

module.exports = (app) => {
  const router = new Router({prefix: '/api'});

  installSpelerRouter(router); // router.get .post ... van _spelers importeren
  installClubsRouter(router);
  installTeamsRouter(router);
  installGamesRouter(router);
  installHealthRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
