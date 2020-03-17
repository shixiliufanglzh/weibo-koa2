/**
 * @description blog service
 */

import { DefinedUser, DefinedBlog, IBlog, UserModel } from '../db/model/index';
import { formatBlog } from './_format';


/**
 * create blog
 * @param {IBlog} {
 *     userId,
 *     content,
 *     image,
 * }
 * @return {Promise<IBlog>}
 */
export async function createBlog({
    userId,
    content,
    image,
}: IBlog): Promise<IBlog> {
    const result = await DefinedBlog.create({
        userId,
        content,
        image,
    });
    // console.log(result);
    if (!result) {
        return result;
    }
    return result.get() as IBlog;
}

/**
 * query blog list by user
 * @param {string} userName
 * @param {number} [pageIndex=0]
 * @param {number} [pageSize=10]
 * @return {Promise<any>}
 */
export async function getBlogsByUser(
    userName: string,
    pageIndex = 0,
    pageSize = 10,
): Promise<{count: number, blogs:IBlog[]}> {
    const userWhereOpt: any = {};
    if (userName) {
        userWhereOpt.userName = userName;
    }
    const result = await DefinedBlog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'DESC'],
        ],
        include: [
            {
                model: DefinedUser,
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOpt,
            },
        ],
    });
    // console.log('blog list of ' + userName, result);
    const blogs = result.rows
        .map((blog) => blog.get())
        .map((blog: IBlog & {user: UserModel}) => {
            const user = blog.user.get();
            return {
                ...blog,
                user,
            };
        });
    return {
        count: result.count,
        blogs: await formatBlog(blogs),
    };
}

/**
 * query blog list by user
 * @param {number} [pageIndex=0]
 * @param {number} [pageSize=10]
 * @return {Promise<any>}
 */
export async function getBlogsForSquare(
    pageIndex = 0,
    pageSize = 10,
): Promise<{count: number, blogs:IBlog[]}> {
    const result = await DefinedBlog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'DESC'],
        ],
        include: [
            {
                model: DefinedUser,
                attributes: ['userName', 'nickName', 'picture'],
                where: {},
            },
        ],
    });
    // console.log('blog list of ' + userName, result);
    const blogs = result.rows
        .map((blog) => blog.get())
        .map((blog: IBlog & {user: UserModel}) => {
            const user = blog.user.get();
            return {
                ...blog,
                user,
            };
        });
    return {
        count: result.count,
        blogs: await formatBlog(blogs),
    };
}
