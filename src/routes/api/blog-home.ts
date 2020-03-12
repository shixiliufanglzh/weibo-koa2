/**
 * @description user api - `register`,`login`, `isExist`
 */

import * as Router from 'koa-router';
import { ExtendedContext } from '../../utils/extends';
import {
    isExist, register, login, deleteCurUser, changeInfo, changePassword, logout,
} from '../../controllers/user';
import { genValidator } from '../../middlewares/validator';
import userValidate from '../../validators/user';
import { isTest } from '../../utils/env';
import { loginCheck } from '../../middlewares/loginChecks';
import { create } from '../../controllers/blog-home';
const router = new Router();

router.prefix('/api/blog');

router.post(
    '/create',
    loginCheck,
    async (ctx: ExtendedContext, next) => {
        const { content, image } = ctx.request.body;
        const { id } = ctx.session.userInfo;
        ctx.body = await create(id, content, image);
    },
);


export default router;
