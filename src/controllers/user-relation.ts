/**
 * @description user relation controller
 */
import { filterXSS } from 'xss';
import { SuccessModel, ErrorModel, IResData } from '../models/ResModel';
import { apiErrInfo } from '../models/ErrorInfo';
import { IUserRelation } from '../db/model';
import { getFollowers } from '../services/user-relation';

/**
 *
 *
 * get blog list of some user
 * @param {number} userId
 * @return {Promise<IResData<IUserRelation | null>>}
 */
export async function getFans(
    userId: number,
): Promise<IResData<IUserRelation | null>> {
    const result = await getFollowers(userId);
    if (result) {
        return new SuccessModel({
            count: result.count,
            list: result.userList,
        });
    }
    return new ErrorModel(apiErrInfo.getBlogFail);
}
