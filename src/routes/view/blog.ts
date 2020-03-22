/**
 * @description user view - `register`,`login`
 */

import * as Router from 'koa-router';
import { ExtendedContext } from '../../utils/extends';
import { IResData } from '../../models/ResModel';
import { loginRedirect } from '../../middlewares/loginChecks';
import { getProfileBlogs } from '../../controllers/blog-profile';
import { isExist } from '../../controllers/user';
import { getSquareBlogs } from '../../controllers/blog-square';
import { IUser, IBlog } from '../../db/model';
import { getFollowers, getFollowing } from '../../controllers/user-relation';
import {
    getAtMeCount, getAtMeBlogs, markAsRead,
} from '../../controllers/blog-at';
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
        const myUserInfo: IUser = ctx.session.userInfo;
        const myUserName: string = myUserInfo.userName;
        // 1.get current user info
        let curUserInfo: IUser;
        const { userName: curUserName } = ctx.params;
        const isMe = myUserName === curUserName;
        if (isMe) {
            curUserInfo = myUserInfo;
        } else {
            const existResult: IResData<IUser> = await isExist(curUserName);
            if (existResult.errno !== 0) {
                return;
            }
            curUserInfo = existResult.data;
        }
        // 2.get blogs of current user
        const blogResult: IResData<IBlog> =
            await getProfileBlogs(curUserName, 0);
        // 3.get fans data
        const fansData = (await getFollowers(curUserInfo.id)).data;
        // 4.get if I followed current user
        const amIFollowedCurUser = fansData.list.some((user) => {
            return user.userName === myUserName;
        });
        // 5. get following data
        const followingData = (await getFollowing(curUserInfo.id)).data;
        // 6. get `atMe` count
        const atCount = (await getAtMeCount(curUserInfo.id)).data;
        // render data
        await ctx.render('profile', {
            userData: {
                userInfo: curUserInfo,
                isMe,
                fansData,
                amIFollowed: amIFollowedCurUser,
                atCount,
                followingData,
            },
            blogData: blogResult.data,
        });
    },
);

router.get(
    '/square',
    loginRedirect,
    async (ctx: ExtendedContext, next) => {
        const result = await getSquareBlogs(0);
        await ctx.render('square', {
            blogData: result.data,
        });
    },
);

router.get(
    '/at-me',
    loginRedirect,
    async (ctx: ExtendedContext, next) => {
        const userId = ctx.session.userInfo.id;
        // 1. get atCount
        const atCount = (await getAtMeCount(userId)).data;
        // 2. get first page data
        const blogData = (await getAtMeBlogs(userId, 0)).data;
        await ctx.render('atMe', {
            atCount,
            blogData,
        });
        // 3. mark as read
        if (atCount > 0) {
            await markAsRead(userId);
        }
    },
);


export default router;
