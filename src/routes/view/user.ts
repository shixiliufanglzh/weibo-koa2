/**
 * @description user view - `register`,`login`
 */

import * as Router from 'koa-router';
import { ExtendedContext } from '../../utils/extends';
const router = new Router();

router.get('/login', async (ctx: ExtendedContext, next) => {
    await ctx.render('login', {});
});

router.get('/register', async (ctx: ExtendedContext, next) => {
    await ctx.render('register', {});
});

export default router;
