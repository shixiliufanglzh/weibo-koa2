import { IUser, DefinedUser, DefinedUserRelation } from '../db/model';
import { formatUser } from './_format';

/**
 * @description user relation service
 */

/**
 * get followers list
 * @param {number} userId
 * @return {Promise<{count: number, userList: IUser[]}>}
 */
export async function getFollowers(
    userId: number,
): Promise<{count: number, userList: IUser[]}> {
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
    const userList = formatUser(result.rows.map((row) => row.get()) as IUser[]);
    return {
        count: result.count,
        userList,
    };
};
