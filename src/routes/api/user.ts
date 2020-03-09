/**
 * @description user api - `register`,`login`, `isExist`
 */

import * as Router from 'koa-router';
import { ExtendedContext } from '../../utils/extends';
import { isExist } from '../../controllers/user';
const router = new Router();

router.prefix('/api/user');

router.post('/register', async (ctx: ExtendedContext, next) => {

});

router.post('/isExist', async (ctx: ExtendedContext, next) => {
    const { userName } = ctx.request.body;
    ctx.body = await isExist(userName);
});


export default router;
