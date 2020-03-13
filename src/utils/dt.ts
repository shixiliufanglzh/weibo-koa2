/**
 * @description format date and time
 */

import { format } from 'date-fns';

/**
 * format datetime such as 2020-02-28 13:08
 * @param {string} str datetime
 * @return {string}
 */
export function timeFormat(str: string): string {
    return format(new Date(str), 'yyyy-MM-dd HH:mm');
}
