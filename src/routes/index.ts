import * as Router from 'koa-router';
const router = new Router();

router.get('/', async (ctx, next) => {
    // await ctx.render('index', {
    //     title: 'Hello Koa 2!',
    // });
    ctx.body = 'Hello Koa 2!';
});

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json',
    };
});

router.get('/profile/:userName', function (ctx, next) {
    const {userName} = ctx.params;
    ctx.body = {
        title: 'this is profile page',
        userName,
    };
});

export default router;
