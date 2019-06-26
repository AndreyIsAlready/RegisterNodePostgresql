const session = require('koa-session');
const RedisStore = require('koa-redis');

exports.init = app => app.use(session({
  //signed: false,
  //store: new RedisStore()
}, app));
