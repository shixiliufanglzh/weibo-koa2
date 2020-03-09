/**
 * @description user controller
 */
import { getUserInfo } from '../services/user';
import { SuccessModel, ErrorModel } from '../models/ResModel';
import { apiErrInfo } from '../models/ErrorInfo';

/**
 * @description judge if this user exist
 * @param {string} userName
 */
export async function isExist(userName: string) {
    const userInfo = await getUserInfo(userName);
    if (userInfo) {
        return new SuccessModel(userInfo);
    } else {
        return new ErrorModel(apiErrInfo.userNameNotExisted);
    }
}
