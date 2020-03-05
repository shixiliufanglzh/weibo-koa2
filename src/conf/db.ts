import {isDev, isProd} from '../utils/env';


let MYSQL_CONF: any;
let REDIS_CONF: any;

if (isDev) {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'weibo',
    };
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1',
    };
} else if (isProd) {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'weibo',
    };
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1',
    };
} else {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'weibo',
    };
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1',
    };
}

export {
    MYSQL_CONF,
    REDIS_CONF,
};
