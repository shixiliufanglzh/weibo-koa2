import {
    User, Blog, AtRelation, IAtRelation, IBlog, UserModel, AtRelationModel,
} from '../db/model';
import { formatUser, formatBlog } from './_format';
import { Op } from 'sequelize';

/**
 * @description `at` relation service
 */

/**
 * create `at` relation
 * @param {number} blogId
 * @param {number} userId
 * @return {Promise<any>}
 */
export async function createAtRelation(
    blogId: number,
    userId: number,
): Promise<any> {
    const result = await AtRelation.create({
        userId,
        blogId,
        isRead: false,
    });
    if (!result) {
        return result;
    }
    return result.get() as IAtRelation;
};

/**
 * get the count of `at` of some user
 * @param {number} userId
 * @return {Promise<number>}
 */
export async function getAtRelationCount(
    userId: number,
): Promise<number> {
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false,
        },
    });
    return result.count;
};

/**
 * get blogs which mentioned current user
 * @param {number} userId
 * @param {number} [pageIndex=0]
 * @param {number} [pageSize=10]
 * @return {Promise<{ count: number, blogs: IBlog[] }>}
 */
export async function getBlogsByMentionUser(
    userId: number,
    pageIndex: number = 0,
    pageSize: number = 10,
): Promise<{ count: number, blogs: IBlog[] }> {
    const result = await Blog.findAndCountAll({
        distinct: true, // remove duplicate blogs from the `count` result
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
                model: AtRelation,
                attributes: ['userId', 'blogId'],
                where: {
                    userId,
                    // isRead: true,
                },
            },
        ],
    });
    const blogs = result.rows
        .map((blog) => blog.get())
        .map((
            blog: IBlog &
            { user: UserModel } &
            { atRelations: AtRelationModel[] },
        ) => {
            const user = blog.user.get();
            const atRelations = blog.atRelations.map((item) => item.get());
            return {
                ...blog,
                user,
                atRelations,
            };
        });
    // console.log('at me blogs', result.count, blogs);
    return {
        count: result.count,
        blogs: await formatBlog(blogs),
    };
};

// export async function deleteFollower(
//     followerId: number,
//     targetUserId: number,
// ): Promise<boolean> {
//     const result = await UserRelation.destroy({
//         where: {
//             userId: targetUserId,
//             followerId,
//         },
//     });
//     return result > 0;
// };
