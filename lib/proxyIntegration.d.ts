import { APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { HttpMethod, ProcessMethod } from './EventProcessor';
import { CorsOptions } from './cors';
declare type ProxyIntegrationParams = {
    paths?: {
        [paramId: string]: string;
    };
    routePath?: string;
};
declare type ProxyIntegrationBody<T = unknown> = {
    body: T;
};
declare type ErrorHandler = (error?: Error, request?: APIGatewayProxyEvent, context?: APIGatewayEventRequestContext) => Promise<APIGatewayProxyResult | void> | APIGatewayProxyResult | void;
export declare type ProxyIntegrationEvent<T = unknown> = Omit<APIGatewayProxyEvent, 'body'> & ProxyIntegrationParams & ProxyIntegrationBody<T>;
export declare type ProxyIntegrationResult = Omit<APIGatewayProxyResult, 'statusCode'> & {
    statusCode?: APIGatewayProxyResult['statusCode'];
};
export interface ProxyIntegrationRoute {
    path: string;
    method: HttpMethod;
    action: (request: ProxyIntegrationEvent<unknown>, context: APIGatewayEventRequestContext) => ProxyIntegrationResult | Promise<ProxyIntegrationResult> | string | Promise<string>;
}
export declare type ProxyIntegrationErrorMapping = {
    [reason: string]: APIGatewayProxyResult['statusCode'];
};
export declare type ProxyIntegrationError = {
    statusCode: APIGatewayProxyResult['statusCode'];
    message: string;
} | {
    reason: string;
    message: string;
};
export interface ProxyIntegrationConfig {
    onError?: ErrorHandler;
    cors?: CorsOptions | boolean;
    routes: ProxyIntegrationRoute[];
    removeBasePath?: boolean;
    debug?: boolean;
    errorMapping?: ProxyIntegrationErrorMapping;
    defaultHeaders?: APIGatewayProxyResult['headers'];
    proxyPath?: string;
}
export declare const process: ProcessMethod<ProxyIntegrationConfig, APIGatewayProxyEvent, APIGatewayEventRequestContext, APIGatewayProxyResult>;
export {};
