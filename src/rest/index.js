// alle modules importeren en exporteren wat nodig
const installSpelerRouter = require('./_spelers');
const installClubsRouter = require('./_clubs')
const Router = require('@koa/router');

module.exports = (app) => {
  const router = new Router({prefix: '/api'});

  installSpelerRouter(router); // router.get .post ... van _spelers importeren
  installClubsRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
}
