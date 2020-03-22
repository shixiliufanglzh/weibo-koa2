/**
 * @description at relations controller
 */
import { apiErrInfo } from '../models/ErrorInfo';
import { ErrorModel, IResData, SuccessModel } from '../models/ResModel';
import {
    getAtRelationCount, getBlogsByMentionUser,
} from '../services/at-relation';
import { PAGE_SIZE } from '../conf/constants';

export async function getAtMeCount(
    userId: number,
): Promise<IResData<any>> {
    const result = await getAtRelationCount(userId);
    if (result) {
        return new SuccessModel(result);
    }
    return new ErrorModel(apiErrInfo.getBlogFail);
}

export async function getAtMeBlogs(
    userId: number,
    pageIndex: number = 0,
): Promise<IResData<any>> {
    const result = await getBlogsByMentionUser(userId, pageIndex, PAGE_SIZE);
    if (result) {
        const { count, blogs: blogList } = result;
        return new SuccessModel({
            isEmpty: blogList.length <= 0,
            count,
            pageSize: PAGE_SIZE,
            pageIndex,
            blogList,
        });
    }
    return new ErrorModel(apiErrInfo.getBlogFail);
}
