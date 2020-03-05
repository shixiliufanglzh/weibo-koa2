import { ParameterizedContext } from 'koa';
import * as Router from 'koa-router';

/**
 * @interface ContextWithRender
 * @extends {ParameterizedContext<any, Router.IRouterParamContext<any, {}>>}
 */
export interface ContextWithRender extends ParameterizedContext<
    any,
    Router.IRouterParamContext<any, {}>
> {
    render(viewPath: string, locals?: any): Promise<void>;
}
