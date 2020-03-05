/**
 * @description method { get, set } of redis
 * @author shixiliufanglzh
 */

import { createClient } from 'redis';
import { REDIS_CONF } from '../conf/db';

// create client
const redisClient = createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', (err) => {
    console.error('redis error ', err);
});

/**
 * redis set method
 * @param {string} key
 * @param {string} val
 * @param {number} timeout unit: s
 */
export const set = (key: string, val: any, timeout=3600): void => {
    if (typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val);
    redisClient.expire(key, timeout);
};

/**
 * redis get method
 * @param {string} key
 * @return {Promise<string>} promise
 */
export const get = (key: string): Promise<string> => {
    const promise: Promise<string> = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err);
                return;
            }
            if (val === null || val === undefined) {
                return resolve(null);
            }
            try {
                resolve(JSON.parse(val));
            } catch (error) {
                resolve(val);
            }
        });
    });
    return promise;
};
