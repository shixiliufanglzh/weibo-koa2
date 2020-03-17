import * as Koa from 'koa';
const app = new Koa();
import * as views from 'koa-views';
import * as json from 'koa-json';
import * as koaStatic from 'koa-static';
// import * as onerror from 'koa-onerror';
const onerror: any = require('koa-onerror');
import { join } from 'path';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
// import * as session from 'koa-generic-session';
import * as session from 'koa-session';
import * as redisStore from 'koa-redis';

import { isProd } from './utils/env';

// configuration
import { REDIS_CONF } from './conf/db';
import { SESSION_SECRET_KEY } from './conf/secretKeys';
// router
import index from './routes/index';
import userView from './routes/view/user';
import userApi from './routes/api/user';
import blogView from './routes/view/blog';
import blogHomeApi from './routes/api/blog-home';
import blogProfileApi from './routes/api/blog-profile';
import blogSquareApi from './routes/api/blog-square';
import utilsApi from './routes/api/utils';
import errorViewRouter from './routes/view/error';


// error handler
let onerrorConf = {};
if (isProd) {
    onerrorConf = {
        redirect: '/error',
    };
}
onerror(app, onerrorConf);

// middlewares
app.use(bodyParser({
    enableTypes: ['json', 'form', 'text'],
}));
app.use(json());
app.use(logger());
app.use(koaStatic(__dirname + '/public'));
app.use(koaStatic(join(__dirname, '../uploadFiles')));

app.use(views(__dirname + '/views', {
    extension: 'ejs',
}));

// session configuration
app.keys = [SESSION_SECRET_KEY];
app.use(session({
    key: 'weibo:sess',
    prefix: 'weibo:sid:',
    // cookie: {
    path: '/',
    maxAge: 24 * 60 * 60 * 1000, // ms
    httpOnly: true,
    // },
    store: redisStore({
        host: REDIS_CONF.host,
        port: REDIS_CONF.port,
        // all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
}, app));
// logger
// app.use(async (ctx, next) => {
//     const start = new Date();
//     await next();
//     const ms: number = Number(new Date()) - Number(start);
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });

// routes
app.use(index.routes()).use(index.allowedMethods());
app.use(userView.routes()).use(userView.allowedMethods());
app.use(userApi.routes()).use(userApi.allowedMethods());
app.use(blogView.routes()).use(blogView.allowedMethods());
app.use(blogHomeApi.routes()).use(blogHomeApi.allowedMethods());
app.use(blogProfileApi.routes()).use(blogProfileApi.allowedMethods());
app.use(blogSquareApi.routes()).use(blogSquareApi.allowedMethods());
app.use(utilsApi.routes()).use(utilsApi.allowedMethods());
app.use(errorViewRouter.routes()).use(errorViewRouter.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

export default app;
