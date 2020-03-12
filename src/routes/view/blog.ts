/**
 * @description user view - `register`,`login`
 */

import * as Router from 'koa-router';
import { ExtendedContext } from '../../utils/extends';
import { loginRedirect } from '../../middlewares/loginChecks';
const router = new Router();

router.get('/', async (ctx: ExtendedContext, next) => {
    await ctx.render('index', {});
});


export default router;
