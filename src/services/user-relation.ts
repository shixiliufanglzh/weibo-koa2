import {
    IUser, DefinedUser, DefinedUserRelation, IUserRelation,
} from '../db/model';
import { formatUser } from './_format';

/**
 * @description user relation service
 */

/**
 * get followers list
 * @param {number} userId
 * @return {Promise<{count: number, list: IUser[]}>}
 */
export async function getFollowers(
    userId: number,
): Promise<{ count: number, list: IUser[] }> {
    const result = await DefinedUser.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        order: [
            ['id', 'DESC'],
        ],
        include: [{
            model: DefinedUserRelation,
            where: {
                userId,
            },
        }],
    });
    // if (!result) {
    //     return result;
    // }
    const list = formatUser(result.rows.map((row) => row.get()) as IUser[]);
    return {
        count: result.count,
        list,
    };
};

/**
 * add follower to target user
 * @param {number} followerId
 * @param {number} targetUserId
 * @return {Promise<IUserRelation>}
 */
export async function addFollower(
    followerId: number,
    targetUserId: number,
): Promise<IUserRelation> {
    const result = await DefinedUserRelation.create({
        userId: targetUserId,
        followerId,
    });
    if (!result) {
        return result;
    }
    return result.get({ plain: true }) as IUserRelation;
};

/**
 * remove follower to target user
 * @param {number} followerId
 * @param {number} targetUserId
 * @return {Promise<any>}
 */
export async function deleteFollower(
    followerId: number,
    targetUserId: number,
): Promise<boolean> {
    const result = await DefinedUserRelation.destroy({
        where: {
            userId: targetUserId,
            followerId,
        },
    });
    return result > 0;
};
