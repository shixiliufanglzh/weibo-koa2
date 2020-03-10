/**
 * @description json schema validate
 */

// const Ajv = require('ajv');
import * as Ajv from 'ajv';
const ajv = new Ajv({
    // allErrors: true // 输出所有的错误（比较慢）
});

/**
 * json schema 校验
 * @param {object} schema json schema rules
 * @param {any} data data to be validated
 * @return {Ajv.ErrorObject}
 */
export default function(schema: any, data: any = {}): Ajv.ErrorObject {
    const valid = ajv.validate(schema, data);
    if (!valid) {
        return ajv.errors[0];
    }
}
