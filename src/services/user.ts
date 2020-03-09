/**
 * @description user service
 */

import { DefinedUser, IUser } from '../db/model/index';
import { formatUser } from './_format';

/**
 * @export
 * @param {string} userName
 * @param {string} password
 */
export async function getUserInfo(userName: string, password?: string) {
    const whereOpt = { userName };
    if (password) {
        Object.assign(whereOpt, { password });
    }
    const result = await DefinedUser.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt,
    });
    if (!result) {
        return result;
    }
    return formatUser(result.get() as IUser);
}
