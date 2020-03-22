/**
 * @description blog homepage api
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
import { create, getHomeBlogs } from '../../controllers/blog-home';
import { getBlogListStr } from '../../utils/blog';
const router = new Router();

router.prefix('/api/blog');

router.post(
    '/create',
    loginCheck,
    genValidator(blogValidate),
    async (ctx: ExtendedContext, next) => {
        const { content, image } = ctx.request.body;
        const { id } = ctx.session.userInfo;
        ctx.body = await create(id, content, image);
    },
);

router.get(
    '/loadMore/:pageIndex',
    loginCheck,
    async (ctx: ExtendedContext, next) => {
        let { pageIndex } = ctx.params;
        pageIndex = parseInt(pageIndex);
        const result = await getHomeBlogs(ctx.session.userInfo.id, pageIndex);
        result.data.blogListTpl = getBlogListStr(result.data.blogList);
        ctx.body = result;
    },
);


export default router;
