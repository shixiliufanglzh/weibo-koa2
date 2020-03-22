/**
 * @description blog `AtMe` api
 */

import * as Router from 'koa-router';
import { getAtMeBlogs } from '../../controllers/blog-at';
import { loginCheck } from '../../middlewares/loginChecks';
import { getBlogListStr } from '../../utils/blog';
import { ExtendedContext } from '../../utils/extends';
const router = new Router();

router.prefix('/api/atMe');

router.get(
    '/loadMore/:pageIndex',
    loginCheck,
    async (ctx: ExtendedContext, next) => {
        const userId = ctx.session.userInfo.id;
        let { pageIndex } = ctx.params;
        pageIndex = parseInt(pageIndex);
        const result = await getAtMeBlogs(userId, pageIndex);
        result.data.blogListTpl = getBlogListStr(result.data.blogList);
        ctx.body = result;
    },
);


export default router;
