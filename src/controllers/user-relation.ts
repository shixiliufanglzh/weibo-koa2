/**
 * @description user relation controller
 */
import { filterXSS } from 'xss';
import { SuccessModel, ErrorModel, IResData } from '../models/ResModel';
import { apiErrInfo } from '../models/ErrorInfo';
import { IUserRelation, IUser } from '../db/model';
import { getFollowers } from '../services/user-relation';

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
