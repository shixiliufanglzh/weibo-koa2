/**
 * @description sequelize instance
 */
import { isProd, isTest } from '../utils/env';
import { MYSQL_CONF } from '../conf/db';
import { Sequelize } from 'sequelize';
import { Options } from 'sequelize/types';

const { host, user, password, database } = MYSQL_CONF;

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
    conf.logging = () => { };
}

export default new Sequelize(database, user, password, conf);
