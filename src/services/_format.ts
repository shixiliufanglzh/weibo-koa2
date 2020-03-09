import { DEFAULT_AVATOR } from '../conf/constants';
import { IUser } from '../db/model';

/**
 *
 * @param {IUser} user
 * @return {IUser} user
 */
function _formateUserPicture(user: IUser): IUser {
    if (!user.picture) {
        user.picture = DEFAULT_AVATOR;
    }
    return user;
}

/**
 *
 * @export function to format user data
 * @param {(IUser | IUser[])} obj
 * @return {(IUser | IUser[])} obj
 */
export function formatUser(obj: IUser | IUser[]): (IUser | IUser[]) {
    if (!obj) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(_formateUserPicture);
    }
    return _formateUserPicture(obj);
}
