import {
    IUser, User, UserRelation, IUserRelation, Blog, AtRelation, IAtRelation,
} from '../db/model';
import { formatUser } from './_format';
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
