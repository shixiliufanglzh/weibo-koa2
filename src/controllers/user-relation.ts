/**
 * @description user relation controller
 */
import { filterXSS } from 'xss';
import { SuccessModel, ErrorModel, IResData } from '../models/ResModel';
import { apiErrInfo } from '../models/ErrorInfo';
import { IUser, IUserRelation } from '../db/model';
import { getFollowers, addFollower, deleteFollower } from '../services/user-relation';

/**
 *
 *
 * get blog list of some user
 * @param {number} userId
 * @return {Promise<IResData<any>>}
 */
export async function getFans(
    userId: number,
): Promise<IResData<{count: number, list: IUser[]} | null>> {
    const result = await getFollowers(userId);
    if (result) {
        return new SuccessModel(result);
    }
    return new ErrorModel(apiErrInfo.getBlogFail);
}

/**
 * follow user
 * @param {number} myUserId
 * @param {number} curUserId
 * @return {Promise<IResData<IUserRelation>>}
 */
export async function follow(
    myUserId: number,
    curUserId: number,
): Promise<IResData<IUserRelation>> {
    try {
        const result = await addFollower(myUserId, curUserId);
        return new SuccessModel(result);
    } catch (error) {
        console.error(error.message, error.stack);
        return new ErrorModel(apiErrInfo.addFollowerFail);
    }
}

/**
 * unfollow user
 * @param {number} myUserId
 * @param {number} curUserId
 * @return {Promise<IResData<IUserRelation>>}
 */
export async function unfollow(
    myUserId: number,
    curUserId: number,
): Promise<IResData<IUserRelation>> {
    const result = await deleteFollower(myUserId, curUserId);
    if (result) {
        return new SuccessModel();
    }
    return new ErrorModel(apiErrInfo.deleteFollowerFail);
}
