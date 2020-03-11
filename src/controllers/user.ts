/**
 * @description user controller
 */
import { getUserInfo, createUser, deleteUser } from '../services/user';
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
        await createUser({
            userName,
            password: doCrypto(password),
            gender,
        });
        return new SuccessModel();
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
