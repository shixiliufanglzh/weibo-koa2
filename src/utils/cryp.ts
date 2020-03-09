import * as crypto from 'crypto';
import { CRYPTO_SECRET_KEY } from '../conf/secretKeys';

const SECRET_KEY = CRYPTO_SECRET_KEY;

/**
 * md5 encryption
 * @param {string} content
 * @return {string}
 */
function _md5(content: string): string {
    const md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

/**
 * generate md5 encryption string for password
 * @param {string} content - deliver password there
 * @return {string}
 */
export default function doCrypto(content: string): string {
    const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`;
    return _md5(str);
}
