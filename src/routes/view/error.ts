/**
 * @description error 404
 * @author shixiliufanglzh
 */

import * as Router from 'koa-router';
import { ContextWithRender } from '../../utils/extends';
const router = new Router();

// error
router.get('/error', async (ctx: ContextWithRender, next) => {
    await ctx.render('error');
});

// 404
router.get('*', async (ctx: ContextWithRender, next) => {
    await ctx.render('404');
});

export default router;
