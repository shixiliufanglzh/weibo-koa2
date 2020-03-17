/**
 * @description user controller
 */
import { filterXSS } from 'xss';
import { BaseModel, SuccessModel, ErrorModel } from '../models/ResModel';
import { apiErrInfo } from '../models/ErrorInfo';
import { getSquareCachedBlogs } from '../cache/blog';
import { PAGE_SIZE } from '../conf/constants';

/**
 *
 *
 * get blog list for public square
 * @param {number} [pageIndex=0]
 * @return {Promise<BaseModel>}
 */
export async function getSquareBlogs(
    pageIndex = 0,
): Promise<BaseModel> {
    const result = await getSquareCachedBlogs(pageIndex, PAGE_SIZE);
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
