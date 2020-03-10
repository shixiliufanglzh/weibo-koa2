/**
 * @description user api - `register`,`login`, `isExist`
 */

import * as Router from 'koa-router';
import { ExtendedContext } from '../../utils/extends';
import { isExist, register } from '../../controllers/user';
import { genValidator } from '../../middlewares/validator';
import userValidate from '../../validators/user';
const router = new Router();

router.prefix('/api/user');

router.post(
    '/register',
    genValidator(userValidate),
    async (ctx: ExtendedContext, next) => {
        const { userName, password, gender } = ctx.request.body;
        ctx.body = await register({ userName, password, gender });
    },
);

router.post('/isExist', async (ctx: ExtendedContext, next) => {
    const { userName } = ctx.request.body;
    ctx.body = await isExist(userName);
});


export default router;
