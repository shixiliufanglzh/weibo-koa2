/**
 * @description utils api - `upload`
 */

import * as Router from 'koa-router';
// import * as koaForm from 'formidable-upload-koa';
// import koaForm from 'formidable-upload-koa';
const koaForm: any = require('formidable-upload-koa');
import { loginCheck } from '../../middlewares/loginChecks';
import { saveFile } from '../../controllers/utils';
import { TARGET_OSS_FOLDER } from '../../conf/constants';
const router = new Router();

// const options = {
//     uploadDir: `${__dirname}/`,
//     keepExtensions: true,
// };

router.prefix('/api/utils');

// upload picture
router.post('/uploadAvatar', loginCheck, koaForm(), async (ctx, next) => {
    const file = (ctx.req as any).files['file'];
    if (!file) {
        return;
    }
    const { size, path, name, type } = file;
    ctx.body = await saveFile(
        TARGET_OSS_FOLDER.avatar,
        { size, path, name, type },
    );
});

// upload blog picture
router.post('/addBlogPicture', loginCheck, koaForm(), async (ctx, next) => {
    const file = (ctx.req as any).files['file'];
    if (!file) {
        return;
    }
    const { size, path, name, type } = file;
    ctx.body = await saveFile(
        TARGET_OSS_FOLDER.blog,
        { size, path, name, type },
    );
});

export default router;
