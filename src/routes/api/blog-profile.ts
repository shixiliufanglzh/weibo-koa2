/**
 * @description blog profile api
 */

import * as Router from 'koa-router';
import { getProfileBlogs } from '../../controllers/blog-profile';
import { loginCheck } from '../../middlewares/loginChecks';
import { getBlogListStr } from '../../utils/blog';
import { ExtendedContext } from '../../utils/extends';
import { follow, unfollow } from '../../controllers/user-relation';
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

router.post('/follow', loginCheck, async (ctx: ExtendedContext, next) => {
    const { id: myUserId } = ctx.session.userInfo;
    const { userId: curUserId } = ctx.request.body;
    ctx.body = await follow(myUserId, curUserId);
});

router.post('/unfollow', loginCheck, async (ctx: ExtendedContext, next) => {
    const { id: myUserId } = ctx.session.userInfo;
    const { userId: curUserId } = ctx.request.body;
    ctx.body = await unfollow(myUserId, curUserId);
});


export default router;
