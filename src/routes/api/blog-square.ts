/**
 * @description user api - `register`,`login`, `isExist`
 */

import * as Router from 'koa-router';
import { ExtendedContext } from '../../utils/extends';
import { loginCheck } from '../../middlewares/loginChecks';
import { getBlogListStr } from '../../utils/blog';
import { getSquareBlogs } from '../../controllers/blog-square';
const router = new Router();

router.prefix('/api/square');

router.get(
    '/loadMore/:pageIndex',
    loginCheck,
    async (ctx: ExtendedContext, next) => {
        let { pageIndex } = ctx.params;
        pageIndex = parseInt(pageIndex);
        const result = await getSquareBlogs(pageIndex);
        result.data.blogListTpl = getBlogListStr(result.data.blogList);
        ctx.body = result;
    },
);


export default router;
