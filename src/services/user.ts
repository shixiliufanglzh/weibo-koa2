/**
 * @description user service
 */

import { User, IUser } from '../db/model/index';
import { formatUser } from './_format';
import { addFollower } from './user-relation';
import { DEFAULT_AVATAR } from '../conf/constants';

/**
 * @param {string} userName
 * @param {string} password
 */
export async function getUserInfo(
    userName: string,
    password?: string,
): Promise<IUser> {
    const whereOpt = { userName };
    if (password) {
        Object.assign(whereOpt, { password });
    }
    const result = await User.findOne({
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
 * @param {IUSER} user (`userName, password, gender, nickName`)
 * @return {Promise}
 */
export async function createUser({
    userName,
    password,
    gender,
    nickName,
}: IUser): Promise<IUser> {
    const result = await User.create({
        userName,
        password,
        gender: gender || 3,
        nickName: nickName || userName,
        picture: DEFAULT_AVATAR,
    });
    // console.log(result);
    if (!result) {
        return result;
    }
    const user = result.get() as IUser;
    addFollower(user.id, user.id);
    return user;
}

export async function deleteUser(userName: string): Promise<boolean> {
    const result = await User.destroy({
        where: {
            userName,
        },
    });
    return result > 0;
}

/**
 * update user information
 * @param {IUserInfoToUpdated} userInfoToUpdated
 * @param {IUserInfoForAuth} userInfoForAuth
 * @return {Promise<boolean>}
 */
export async function updateUser(
    userInfoToUpdated: IUserInfoToUpdated,
    userInfoForAuth: IUserInfoForAuth,
): Promise<boolean> {
    const updateData: IUserInfoToUpdated = {};
    if (userInfoToUpdated.password) {
        updateData.password = userInfoToUpdated.password;
    }
    if (userInfoToUpdated.nickName) {
        updateData.nickName = userInfoToUpdated.nickName;
    }
    if (userInfoToUpdated.picture) {
        updateData.picture = userInfoToUpdated.picture;
    }
    if (userInfoToUpdated.city) {
        updateData.city = userInfoToUpdated.city;
    }
    const whereData: any = {
        userName: userInfoForAuth.userName,
    };
    if (userInfoForAuth.password) {
        whereData.password = userInfoForAuth.password;
    }
    const result = await User.update(updateData, {
        where: whereData,
    });
    return result[0] > 0;
}

interface IUserInfoForAuth {
    userName: string,
    password?: string,
}

interface IUserInfoToUpdated {
    password?: string,
    nickName?: string,
    picture?: string,
    city?: string,
}
