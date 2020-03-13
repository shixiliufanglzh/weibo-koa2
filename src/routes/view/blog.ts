/**
 * @description user view - `register`,`login`
 */

import * as Router from 'koa-router';
import { ExtendedContext } from '../../utils/extends';
import { loginRedirect } from '../../middlewares/loginChecks';
import { getProfileBlogs } from '../../controllers/blog-profile';
import { isExist } from '../../controllers/user';
const router = new Router();

router.get('/', loginRedirect, async (ctx: ExtendedContext, next) => {
    await ctx.render('index', {});
});

router.get('/profile', loginRedirect, async (ctx: ExtendedContext, next) => {
    const { userName } = ctx.session.userInfo;
    ctx.redirect(`/profile/${userName}`);
});

router.get(
    '/profile/:userName',
    loginRedirect,
    async (ctx: ExtendedContext, next) => {
        const myUserInfo = ctx.session.userInfo;
        const myUserName = myUserInfo.userName;

        let curUserInfo;
        const { userName: curUserName } = ctx.params;
        const isMe = myUserName === curUserName;
        if (isMe) {
            curUserInfo = myUserInfo;
        } else {
            const existResult = await isExist(curUserName);
            if (existResult.errno !== 0) {
                return;
            }
            curUserInfo = existResult.data;
        }
        const result = await getProfileBlogs(curUserName, 0);
        await ctx.render('profile', {
            blogData: result.data,
            userData: {
                userInfo: curUserInfo,
                isMe,
            },
        });
    },
);


export default router;
