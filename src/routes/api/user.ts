/**
 * @description user api - `register`,`login`, `isExist`
 */

import * as Router from 'koa-router';
import { ExtendedContext } from '../../utils/extends';
import {
    isExist, register, login, deleteCurUser,
} from '../../controllers/user';
import { genValidator } from '../../middlewares/validator';
import userValidate from '../../validators/user';
import { isTest } from '../../utils/env';
import { loginCheck } from '../../middlewares/loginChecks';
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

router.post(
    '/login',
    async (ctx: ExtendedContext, next) => {
        const { userName, password } = ctx.request.body;
        ctx.body = await login(ctx, userName, password);
    },
);

router.post(
    '/delete',
    loginCheck,
    async (ctx: ExtendedContext, next) => {
        if (isTest) {
            // test env - delete test account
            const { userName } = ctx.session.userInfo;
            ctx.body = await deleteCurUser(userName);
        }
    },
);

router.post('/isExist', async (ctx: ExtendedContext, next) => {
    const { userName } = ctx.request.body;
    ctx.body = await isExist(userName);
});


export default router;
