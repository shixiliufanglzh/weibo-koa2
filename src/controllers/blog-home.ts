/**
 * @description user controller
 */
import {
    getUserInfo, createUser, deleteUser, updateUser,
} from '../services/user';
import { BaseModel, SuccessModel, ErrorModel } from '../models/ResModel';
import { apiErrInfo } from '../models/ErrorInfo';
import doCrypto from '../utils/cryp';
import { ExtendedContext } from '../utils/extends';
import { createBlog } from '../services/blog';

/**
 * create blog of some user
 * @param {number} userId
 * @param {string} content
 * @param {string} image
 * @return {Promise<BaseModel>}
 */
export async function create(
    userId: number,
    content: string,
    image: string,
): Promise<BaseModel> {
    try {
        const blog = await createBlog({
            userId,
            content,
            image,
        });
        return new SuccessModel(blog);
    } catch (error) {
        console.error(error.message, error.stack);
        return new ErrorModel(apiErrInfo.createBlogFail);
    }
}
