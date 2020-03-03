/**
 * @description sequelize instance
 */

// eslint-disable-next-line no-unused-vars
import {Sequelize, Options} from 'sequelize';
import {isProd, isTest} from '../utils/env';
import dbConf from '../conf/db';

const {host, user, password, database} = dbConf.MYSQL_CONF;

const conf: Options = {
    host,
    dialect: 'mysql',
};

if (isProd) {
    conf.pool = {
        max: 5,
        min: 0,
        idle: 10000,
    };
}

if (isTest) {
    conf.logging = () => {};
}

const seq = new Sequelize(database, user, password, conf);

export default seq;
