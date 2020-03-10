/**
 * @description 微博 数据格式校验
 */

import * as Ajv from 'ajv';
import validate from './_validate';

// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string',
        },
        image: {
            type: 'string',
            maxLength: 255,
        },
    },
};

/**
 * 校验微博数据格式
 * @param {Object} data 微博数据
 * @return {Ajv.ErrorObject}
 */
function blogValidate(data: any = {}): Ajv.ErrorObject {
    return validate(SCHEMA, data);
}

module.exports = blogValidate;
