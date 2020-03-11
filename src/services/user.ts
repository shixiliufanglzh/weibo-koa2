/**
 * @description user service
 */

import { DefinedUser, IUser } from '../db/model/index';
import { formatUser } from './_format';

/**
 * @param {string} userName
 * @param {string} password
 */
export async function getUserInfo(
    userName: string,
    password?: string,
): Promise<IUser | IUser[]> {
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

/**
 * create user
 * @param {{
 *     userName: string,
 *     password: string,
 *     gender: number,
 *     nickName: string
 * }} user (`userName, password, gender, nickName`)
 * @return {Promise}
 */
export async function createUser({
    userName,
    password,
    gender,
    nickName,
}: {
    userName: string,
    password: string,
    gender?: number,
    nickName?: string
}): Promise<IUser> {
    const result = await DefinedUser.create({
        userName,
        password,
        gender: gender || 3,
        nickName: nickName || userName,
    });
    console.log(result);
    if (!result) {
        return result;
    }
    return result.get() as IUser;
}

export async function deleteUser(userName: string): Promise<boolean> {
    const result = await DefinedUser.destroy({
        where: {
            userName,
        },
    });
    return result > 0;
}
