/**
 * @description user view - `register`,`login`
 */

import * as Router from 'koa-router';
import { ExtendedContext } from '../../utils/extends';
import { loginRedirect } from '../../middlewares/loginChecks';
const router = new Router();

router.get('/login', async (ctx: ExtendedContext, next) => {
    await ctx.render('login', getLoginInfo(ctx));
});

router.get('/register', async (ctx: ExtendedContext, next) => {
    await ctx.render('register', getLoginInfo(ctx));
});

router.get('/setting', loginRedirect, async (ctx: ExtendedContext, next) => {
    await ctx.render('setting', ctx.session.userInfo);
});

/**
 * @param {ExtendedContext} ctx koa2 context
 * @return {{
 *     isLogin: boolean,
 *     userName: string,
 * }} { isLogin, userName }
 */
function getLoginInfo(ctx: ExtendedContext) {
    let data: {
        isLogin: boolean,
        userName?: string,
    } = {
        isLogin: false,
    };
    const userInfo = ctx.session.userInfo;
    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName,
        };
    }
    return data;
}

export default router;
