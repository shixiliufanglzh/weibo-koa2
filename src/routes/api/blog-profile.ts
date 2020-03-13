/**
 * @description user api - `register`,`login`, `isExist`
 */

import * as Router from 'koa-router';
import { ExtendedContext } from '../../utils/extends';
import {
    isExist, register, login, deleteCurUser, changeInfo, changePassword, logout,
} from '../../controllers/user';
import { genValidator } from '../../middlewares/validator';
import blogValidate from '../../validators/blog';
import { isTest } from '../../utils/env';
import { loginCheck } from '../../middlewares/loginChecks';
import { create } from '../../controllers/blog-home';
import { getProfileBlogs } from '../../controllers/blog-profile';
import { getBlogListStr } from '../../utils/blog';
const router = new Router();

router.prefix('/api/profile');

router.get(
    '/loadMore/:userName/:pageIndex',
    loginCheck,
    async (ctx: ExtendedContext, next) => {
        let { userName, pageIndex } = ctx.params;
        pageIndex = parseInt(pageIndex);
        const result = await getProfileBlogs(userName, pageIndex);
        result.data.blogListTpl = getBlogListStr(result.data.blogList);
        ctx.body = result;
    },
);


export default router;
