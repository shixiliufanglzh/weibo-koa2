/**
 * @description utils for handling blog data
 */

import { render } from 'ejs';
import { join } from 'path';
import { readFileSync } from 'fs';
const fs = require('fs');
const path = require('path');

// read the content of `blog-list.ejs`
const BLOG_LIST_TPL = readFileSync(
    join(__dirname, '../views/widgets/blog-list.ejs'),
).toString();

/**
 * render html string with `blogList`
 * @param {Array} blogList 微博列表
 * @param {boolean} canReply 是否可以回复
 * @return {string}
 */
export function getBlogListStr(blogList: any[], canReply = false): string {
    return render(BLOG_LIST_TPL, {
        blogList,
        canReply,
    });
}
