/**
 * @description utils controller
 */
import { BaseModel, SuccessModel, ErrorModel } from '../models/ResModel';
import { apiErrInfo } from '../models/ErrorInfo';
import { remove, move, pathExists, ensureDir } from 'fs-extra';
import { join } from 'path';

// the target folder path to save uploaded file
const DIST_FOLDER_PATH = join(__dirname, '../../uploadFiles');
// max size of uploaded file is 1 MB
const MAX_SIZE = 1024 * 1024 * 1024;
// make sure the folder `uploadFiles` exists
pathExists(DIST_FOLDER_PATH).then((isExist) => {
    if (!isExist) {
        ensureDir(DIST_FOLDER_PATH);
    }
});

/**
 * save file
 * @param {number} size
 * @param {string} path
 * @param {string} name
 * @param {string} type
 * @return {Promise<BaseModel>}
 */
export async function saveFile(
    { size, path, name, type }: {
        size: number,
        path: string,
        name: string,
        type: string,
    },
): Promise<BaseModel> {
    if (size > MAX_SIZE) {
        remove(path);
        return new ErrorModel(apiErrInfo.uploadFileSizeFail);
    }
    const fileName = `${Date.now()}.${name}`;
    const destFilePath = join(DIST_FOLDER_PATH, fileName);
    move(path, destFilePath);
    return new SuccessModel({
        url: '/' + fileName,
    });
};
