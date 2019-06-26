const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const config = require('config');
const movieRoutes = require('./routes/movies');
const queries = require('./src/server/db/queries/users');
const passport = require('koa-passport');


require('./auth');
app.use(passport.initialize());
app.use(passport.session());


require('./handlers/01-favicon').init(app);
require('./handlers/02-static').init(app);
require('./handlers/03-logger').init(app);
require('./handlers/04-templates').init(app);
require('./handlers/05-errors').init(app);
require('./handlers/06-session').init(app);
require('./handlers/07-bodyParser').init(app);
//require('./handlers/09-passport.js').init(app);

app.keys = ['super-secret-key'];

router.get('/auth/register', async (ctx,next) => {
    ctx.body = ctx.render('register.pug');
    await next();
  });

router.get('/',async (ctx,next)=>{
    ctx.body = ctx.render('hello.pug');
    await next();
    })


router.get('/gaven', async (ctx, next) => {
    ctx.body = 'ta eba'
    await next()
});

router.post('/auth/register', async (ctx,next) => {
    const user = await queries.addUser(ctx.request.body);
    return passport.authenticate('local', (err, user, info, status) => {
      if (user) {
        ctx.login(user);
        ctx.redirect('/auth/status');
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error' };
      }
    })(ctx);

    await next();
  });

  router.get('/auth/status', async (ctx,next) => {
    if (ctx.isAuthenticated()) {
        ctx.body = ctx.render('status.pug');
    } else {
      ctx.redirect('/auth/login');
    }
    await next();
  });

  router.get('/auth/login', async (ctx,next) => {
    if (!ctx.isAuthenticated()) {
        ctx.body = ctx.render('login.pug');
    } else {
      ctx.redirect('/auth/status');
    }
    await next();
  });

  router.post('/auth/login', async (ctx,next) => {
    return passport.authenticate('local', (err, user, info, status) => {
      if (user) {
        ctx.login(user);
        ctx.redirect('/auth/status');
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error' };
      }
    })(ctx);

    await next();
  });

  router.get('/auth/logout', async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      ctx.logout();
      ctx.redirect('/auth/login');
    } else {
      ctx.body = { success: false };
      ctx.throw(401);
    }
    await next();
  });

app.use(movieRoutes.routes());

app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(config.get('port'));   