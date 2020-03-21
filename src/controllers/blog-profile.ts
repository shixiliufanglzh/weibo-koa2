/**
 * @description user blog profile controller
 */
import { filterXSS } from 'xss';
import { SuccessModel, ErrorModel, IResData } from '../models/ResModel';
import { apiErrInfo } from '../models/ErrorInfo';
import { getBlogsByUser, getBlogsOfFollowing } from '../services/blog';
import { PAGE_SIZE } from '../conf/constants';

/**
 *
 *
 * get blog list of some user
 * @param {string} userName
 * @param {number} [pageIndex=0]
 * @return {Promise<IResData<any>>}
 */
export async function getProfileBlogs(
    userName: string,
    pageIndex: number = 0,
): Promise<IResData<any>> {
    const result = await getBlogsByUser(userName, pageIndex, PAGE_SIZE);
    if (result) {
        const blogList = result.blogs;
        return new SuccessModel({
            isEmpty: blogList.length <= 0,
            count: result.count,
            pageSize: PAGE_SIZE,
            pageIndex,
            blogList,
        });
    }
    return new ErrorModel(apiErrInfo.getBlogFail);
}
