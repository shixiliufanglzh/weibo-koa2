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
import { getFans } from '../../controllers/user-relation';
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
        const fansData = (await getFans(curUserInfo.id)).data;
        // 4.get if I followed current user
        const amIFollowedCurUser = fansData.list.some((user) => {
            return user.userName === myUserName;
        });
        // render data
        await ctx.render('profile', {
            userData: {
                userInfo: curUserInfo,
                isMe,
                fansData,
                amIFollowed: amIFollowedCurUser,
                atCount: 0, // TBD
                followingData: {
                    count: 0,
                    list: [],
                },
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


export default router;
