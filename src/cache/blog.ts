/**
 * @description cache blogs for blogs square
 */
import { get, set } from './_redis';
import { getBlogsForSquare } from '../services/blog';
import { IBlog } from '../db/model';

const KEY_PREFIX = 'weibio:square:';

export const getSquareCachedBlogs = async (
    pageIndex: number,
    pageSize: number,
): Promise<{
    count: number;
    blogs: IBlog[];
}> => {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`;
    const cachedResult = await get(key);
    if (cachedResult) {
        return cachedResult as {
            count: number;
            blogs: IBlog[];
        };
    }
    const result = await getBlogsForSquare(pageIndex, pageSize);
    set(key, result, 60);
    return result;
};
