import * as Koa from 'koa';
const app = new Koa();
import * as views from 'koa-views';
import * as json from 'koa-json';
// import * as onerror from 'koa-onerror'
const onerror: any = require('koa-onerror');
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';

import index from './routes/index';
import users from './routes/users';


// error handler
onerror(app);

// middlewares
app.use(bodyParser({
    enableTypes: ['json', 'form', 'text'],
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
    extension: 'ejs',
}));

// logger
// app.use(async (ctx, next) => {
//     const start = new Date();
//     await next();
//     const ms: number = Number(new Date()) - Number(start);
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });

// routes
app.use(index.routes()).use(index.allowedMethods());
app.use(users.routes()).use(users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

export default app;
