/**
 * @description json schema validator middleware
 */
import * as Ajv from 'ajv';
import { ErrorModel } from '../models/ResModel';
import { apiErrInfo } from '../models/ErrorInfo';

/**
 * generate validator function (middleware)
 * @param {function} validateFn
 * @return {function} validator
 */
export function genValidator(
    validateFn: (data: any) => Ajv.ErrorObject,
): (ctx: any, next: any) => Promise<any> {
    async function validator(ctx: any, next: any) {
        const error = validateFn(ctx.request.body);
        if (error) {
            ctx.body = new ErrorModel(apiErrInfo.jsonSchemaFail);
            return;
        }
        await next();
    }
    return validator;
}
