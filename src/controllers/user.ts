/**
 * @description user controller
 */
import {
    getUserInfo, createUser, deleteUser, updateUser,
} from '../services/user';
import { BaseModel, SuccessModel, ErrorModel } from '../models/ResModel';
import { apiErrInfo } from '../models/ErrorInfo';
import doCrypto from '../utils/cryp';
import { ExtendedContext } from '../utils/extends';

/**
 * @description judge if this user exist
 * @param {string} userName
 */
export async function isExist(userName: string): Promise<BaseModel> {
    const userInfo = await getUserInfo(userName);
    if (userInfo) {
        return new SuccessModel(userInfo);
    } else {
        return new ErrorModel(apiErrInfo.userNameNotExisted);
    }
}

/**
 * register new user
 * @param {{
 *     userName: string,
 *     password: string,
 *     gender: number
 * }} { userName, password, gender }
 * @return {Promise<BaseModel>}
 */
export async function register({ userName, password, gender }: {
    userName: string,
    password: string,
    gender: number
}): Promise<BaseModel> {
    const userInfo = await getUserInfo(userName);
    if (userInfo) {
        return new ErrorModel(apiErrInfo.registerUserNameExist);
    }
    try {
        const user = await createUser({
            userName,
            password: doCrypto(password),
            gender,
        });
        return new SuccessModel(user);
    } catch (error) {
        console.error(error.message, error.stack);
        return new ErrorModel(apiErrInfo.registerFail);
    }
}

/**
 * login api
 * @param {ExtendedContext} ctx
 * @param {string} userName
 * @param {string} password
 * @return {Promise<BaseModel>}
 */
export async function login(
    ctx: ExtendedContext,
    userName: string,
    password: string,
): Promise<BaseModel> {
    const userInfo = await getUserInfo(userName, doCrypto(password));
    if (!userInfo) {
        return new ErrorModel(apiErrInfo.loginFail);
    }
    if (!ctx.session.userInfo) {
        ctx.session.userInfo = userInfo;
    }
    return new SuccessModel(userInfo);
}

export async function deleteCurUser(userName: string): Promise<BaseModel> {
    const result = await deleteUser(userName);
    if (result) {
        return new SuccessModel();
    }
    return new ErrorModel(apiErrInfo.deleteUserFail);
}

/**
 * change user infomation
 * @param {ExtendedContext} ctx
 * @param {string} nickName
 * @param {string} picture
 * @param {string} city
 * @return {Promise<BaseModel>}
 */
export async function changeInfo(
    ctx: ExtendedContext,
    { nickName, picture, city }: { [key: string]: string },
): Promise<BaseModel> {
    const { userName } = ctx.session.userInfo;
    if (!nickName) {
        nickName = userName;
    }
    const result = await updateUser({
        nickName,
        picture,
        city,
    }, {
        userName,
    });
    if (result) {
        Object.assign(ctx.session.userInfo, {
            nickName,
            picture,
            city,
        });
        return new SuccessModel();
    }
    return new ErrorModel(apiErrInfo.changeInfoFail);
}

/**
 * change user infomation
 * @param {string} userName
 * @param {string} password
 * @param {string} newPassword
 * @return {Promise<BaseModel>}
 */
export async function changePassword(
    userName: string,
    password: string,
    newPassword: string,
): Promise<BaseModel> {
    const result = await updateUser({
        password: doCrypto(newPassword),
    }, {
        userName,
        password: doCrypto(password),
    });
    if (result) {
        return new SuccessModel();
    }
    return new ErrorModel(apiErrInfo.changePasswordFail);
}

export async function logout(ctx: ExtendedContext): Promise<BaseModel> {
    delete ctx.session.userInfo;
    return new SuccessModel();
}
