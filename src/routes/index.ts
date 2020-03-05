import * as Router from 'koa-router';
import { ExtendedContext } from '../utils/extends';
const router = new Router();

router.get('/', async (ctx: ExtendedContext, next) => {
    // render(viewPath: string, locals?: any): Promise<void>;
    // await ctx.render('index', {
    //     title: 'Hello Koa 2!',
    //     isMe: true,
    //     blogList: [
    //         {
    //             id: 1,
    //             title: 'aaa',
    //         },
    //         {
    //             id: 2,
    //             title: 'bbb',
    //         },
    //         {
    //             id: 3,
    //             title: 'ccc',
    //         },
    //     ],
    // });
    ctx.body = 'Hello Koa 2!';
});

router.get('/string', async (ctx: ExtendedContext, next) => {
    const session = ctx.session;
    if (!session.viewNum) {
        session.viewNum = 0;
    }
    session.viewNum += 1;
    ctx.body = 'viewNum ' + session.viewNum;
});

router.get('/json', async (ctx, next) => {
    ctx.body = { title: 'koa2 json' };
});

router.get('/profile/:userName', function (ctx, next) {
    const { userName } = ctx.params;
    ctx.body = {
        title: 'this is profile page',
        userName,
    };
});

export default router;
