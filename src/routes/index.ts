import * as Router from 'koa-router';
import { ExtendedContext } from '../utils/extends';
import { loginRedirect, loginCheck } from '../middlewares/loginChecks';
import { IUser, IBlog } from '../db/model';
import { IResData } from '../models/ResModel';
import { getFollowers, getFollowing } from '../controllers/user-relation';
import { getHomeBlogs } from '../controllers/blog-home';
const router = new Router();

router.get(
    '/',
    loginRedirect,
    async (ctx: ExtendedContext, next) => {
        const myUserInfo: IUser = ctx.session.userInfo;
        // 1.get current user info
        // const { userName: curUserName } = ctx.params;
        // 2.get blogs of current user
        const blogResult: IResData<IBlog> =
            await getHomeBlogs(myUserInfo.id, 0);
        // 3.get fans data
        const fansData = (await getFollowers(myUserInfo.id)).data;
        // 5. get following data
        const followingData = (await getFollowing(myUserInfo.id)).data;
        // render data
        await ctx.render('index', {
            userData: {
                userInfo: myUserInfo,
                fansData,
                atCount: 0, // TBD
                followingData,
            },
            blogData: blogResult.data,
        });
    },
);


export default router;
