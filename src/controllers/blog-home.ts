/**
 * @description user controller
 */
import { filterXSS } from 'xss';
import { SuccessModel, ErrorModel, IResData } from '../models/ResModel';
import { apiErrInfo } from '../models/ErrorInfo';
import { createBlog, getBlogsOfFollowing } from '../services/blog';
import { PAGE_SIZE, REG_FOR_AT_WHO } from '../conf/constants';
import { getUserInfo } from '../services/user';
import { createAtRelation } from '../services/at-relation';

/**
 * create blog of some user
 * @param {number} userId
 * @param {string} content
 * @param {string} image
 * @return {Promise<BaseModel>}
 */
export async function create(
    userId: number,
    content: string,
    image: string,
): Promise<IResData<any>> {
    const atUserNameList: string[] = [];
    content = content.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickNmae, userName) => {
            atUserNameList.push(userName);
            return matchStr;
        },
    );
    const atUserList = await Promise.all(
        atUserNameList.map((userName) => getUserInfo(userName)),
    );
    const atUserIdList = atUserList.map((user) => user.id);

    try {
        const blog = await createBlog({
            userId,
            content: filterXSS(content),
            image,
        });
        await Promise.all(
            atUserIdList.map((userId) => createAtRelation(blog.id, userId)),
        );
        return new SuccessModel(blog);
    } catch (error) {
        console.error(error.message, error.stack);
        return new ErrorModel(apiErrInfo.createBlogFail);
    }
}

export async function getHomeBlogs(
    userId: number,
    pageIndex: number = 0,
): Promise<IResData<any>> {
    const result = await getBlogsOfFollowing(userId, pageIndex, PAGE_SIZE);
    if (result) {
        const blogList = result.blogs;
        return new SuccessModel({
            isEmpty: blogList.length <= 0,
            count: result.count,
            pageSize: PAGE_SIZE,
            pageIndex,
            blogList,
        });
    }
    return new ErrorModel(apiErrInfo.getBlogFail);
}
