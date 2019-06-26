const passport = require('koa-passport');
require('../auth');

exports.init = app =>{
    app.use(passport.initialize());
    app.use(passport.session());
}