import { ParameterizedContext } from 'koa';
import * as Router from 'koa-router';

/**
 * @interface ExtendedContext
 * @extends {ParameterizedContext<any, Router.IRouterParamContext<any, {}>>}
 */
export interface ExtendedContext extends ParameterizedContext<
    any,
    Router.IRouterParamContext<any, {}>
> {
    render(viewPath: string, locals?: any): Promise<void>;
    session: any;
}
