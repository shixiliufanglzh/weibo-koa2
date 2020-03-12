/**
 * @description utils api - `upload`
 */

import * as Router from 'koa-router';
// import * as koaForm from 'formidable-upload-koa';
// import koaForm from 'formidable-upload-koa';
const koaForm: any = require('formidable-upload-koa');
import { loginCheck } from '../../middlewares/loginChecks';
import { saveFile } from '../../controllers/utils';
const router = new Router();

// const options = {
//     uploadDir: `${__dirname}/`,
//     keepExtensions: true,
// };

router.prefix('/api/utils');

// upload picture
router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
    const file = (ctx.req as any).files['file'];
    if (!file) {
        return;
    }
    const { size, path, name, type } = file;
    ctx.body = await saveFile({ size, path, name, type });
});

export default router;
