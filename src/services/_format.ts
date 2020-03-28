import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DEFAULT_AVATAR, REG_FOR_AT_WHO } from '../conf/constants';
import { IUser, IBlog } from '../db/model';
import { timeFormat } from '../utils/dt';

/**
 *
 * @param {IUser} user
 * @return {IUser} user
 */
function _formateUserPicture(user: IUser): IUser {
    if (!user.picture) {
        user.picture = DEFAULT_AVATAR;
    }
    return user;
}

/**
 *
 * @export function to format user data
 * @param {(IUser | IUser[])} obj
 * @return {(IUser | IUser[])} obj
 */
export function formatUser(obj: IUser): (IUser)
export function formatUser(obj: IUser[]): (IUser[])
export function formatUser(obj: IUser | IUser[]): (IUser | IUser[]) {
    if (!obj) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(_formateUserPicture);
    }
    return _formateUserPicture(obj);
}


/**
 * format datetime in some object
 * @param {any} obj the data contains `createdAt`, `updatedAt`
 * @return {any}
 */
function _formatDBTime(obj: any): any {
    obj.createdAtFormat = timeFormat(obj.createdAt);
    obj.updatedAtFormat = timeFormat(obj.updatedAt);
    return obj;
}


/**
 * formate blog content
 * @param {IBlog} obj blog object
 * @return {IBlog}
 */
function _formatContent(obj: IBlog): IBlog {
    obj.contentFormat = obj.content;

    // format `@` expression
    // from 'Hello @CoolBoy - Reed How are you?'
    // to 'Hello <a href="/profile/Reed">CoolBoy</a> How are you?'
    obj.contentFormat = obj.contentFormat.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            return `<a href="/profile/${userName}">@${nickName}</a>`;
        },
    );
    return obj;
}

/**
 * format blog data
 * @param {(IBlog[] | IBlog)} blogs
 * @return {(IBlog[] | IBlog)}
 */
export async function formatBlog(blogs: IBlog): Promise<IBlog>
export async function formatBlog(blogs: IBlog[]): Promise<IBlog[]>
export async function formatBlog(
    blogs: IBlog | IBlog[],
): Promise<IBlog | IBlog[]> {
    if (!blogs) {
        return blogs;
    }
    if (Array.isArray(blogs)) {
        return blogs.map(_formatDBTime).map(_formatContent);
    }
    const result = blogs;
    return of(result).pipe(
        map((res) => _formatDBTime(res)),
        map((res) => _formatContent(res)),
    ).toPromise();
}
