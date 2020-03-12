/**
 * @description blog service
 */

import { DefinedBlog, IBlog } from '../db/model/index';


/**
 * create blog
 * @param {IBlog} {
 *     userId,
 *     content,
 *     image,
 * }
 * @return {Promise<IBlog>}
 */
export async function createBlog({
    userId,
    content,
    image,
}: IBlog): Promise<IBlog> {
    const result = await DefinedBlog.create({
        userId,
        content,
        image,
    });
    console.log(result);
    if (!result) {
        return result;
    }
    return result.get() as IBlog;
}
