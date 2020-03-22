/**
 * @description at relations controller
 */
import { apiErrInfo } from '../models/ErrorInfo';
import { ErrorModel, IResData, SuccessModel } from '../models/ResModel';
import { getAtRelationCount } from '../services/at-relation';

export async function getAtMeCount(
    userId: number,
): Promise<IResData<any>> {
    const result = await getAtRelationCount(userId);
    if (result) {
        return new SuccessModel(result);
    }
    return new ErrorModel(apiErrInfo.getBlogFail);
}
