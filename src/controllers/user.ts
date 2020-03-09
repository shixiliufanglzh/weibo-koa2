/**
 * @description user controller
 */
import { getUserInfo, createUser } from '../services/user';
import { BaseModel, SuccessModel, ErrorModel } from '../models/ResModel';
import { apiErrInfo } from '../models/ErrorInfo';
import doCrypto from '../utils/cryp';

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
export async function register({userName, password, gender }:{
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
