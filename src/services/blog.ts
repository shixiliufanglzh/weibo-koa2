/**
 * @description blog service
 */

import {
    User, Blog, IBlog, UserModel, UserRelation,
} from '../db/model/index';
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
    const result = await Blog.create({
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
    pageIndex: number = 0,
    pageSize: number = 10,
): Promise<{ count: number, blogs: IBlog[] }> {
    const userWhereOpt: any = {};
    if (userName) {
        userWhereOpt.userName = userName;
    }
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'DESC'],
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOpt,
            },
        ],
    });
    // console.log('blog list of ' + userName, result);
    const blogs = result.rows
        .map((blog) => blog.get())
        .map((blog: IBlog & { user: UserModel }) => {
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
 * query all blog list
 * @param {number} [pageIndex=0]
 * @param {number} [pageSize=10]
 * @return {Promise<any>}
 */
export async function getBlogsForSquare(
    pageIndex: number = 0,
    pageSize: number = 10,
): Promise<{ count: number, blogs: IBlog[] }> {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'DESC'],
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: {},
            },
        ],
    });
    // console.log('blog list of ' + userName, result);
    const blogs = result.rows
        .map((blog) => blog.get())
        .map((blog: IBlog & { user: UserModel }) => {
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
 * get blogs of all followers (include self)
 * @param {number} followerId
 * @param {number} [pageIndex=0]
 * @param {number} [pageSize=10]
 * @return {Promise<{count: number, blogs:IBlog[]}>}
 */
export async function getBlogsOfFollowing(
    followerId: number,
    pageIndex: number = 0,
    pageSize: number = 10,
): Promise<{ count: number, blogs: IBlog[] }> {
    const userWhereOpt: any = {};
    if (followerId) {
        userWhereOpt.followerId = followerId;
    }
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'DESC'],
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
            },
            {
                model: UserRelation,
                attributes: ['userId', 'followerId'],
                where: userWhereOpt,
            },
        ],
    });
    // console.log('blog list of ' + userName, result);
    const blogs = result.rows
        .map((blog) => blog.get())
        .map((blog: IBlog & { user: UserModel }) => {
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
