/**
 * @description login check
 */

import { Next } from 'koa';
import * as Ajv from 'ajv';
import { ErrorModel } from '../models/ResModel';
import { apiErrInfo } from '../models/ErrorInfo';
import { ExtendedContext } from '../utils/extends';


/**
 * API login check
 * @param {ExtendedContext} ctx
 * @param {Next} next
 */
export async function loginCheck(ctx: ExtendedContext, next: Next) {
    if (ctx.session && ctx.session.userInfo) {
        await next();
        return;
    }
    ctx.body = new ErrorModel(apiErrInfo.loginCheckFail);
};

/**
 * UI login check
 * @param {ExtendedContext} ctx
 * @param {Next} next
 */
export async function loginRedirect(ctx: ExtendedContext, next: Next) {
    if (ctx.session && ctx.session.userInfo) {
        await next();
        return;
    }
    ctx.redirect(`/login?url=${encodeURIComponent(ctx.url)}`);
};
