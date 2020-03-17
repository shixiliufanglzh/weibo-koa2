/**
 * @description user api - `register`,`login`, `isExist`
 */

import * as Router from 'koa-router';
import { getProfileBlogs } from '../../controllers/blog-profile';
import { loginCheck } from '../../middlewares/loginChecks';
import { getBlogListStr } from '../../utils/blog';
import { ExtendedContext } from '../../utils/extends';
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
