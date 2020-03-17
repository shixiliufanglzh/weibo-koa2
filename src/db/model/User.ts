import { Model, BuildOptions, STRING, TINYINT } from 'sequelize';
import seq from '../seq';

export interface IUser {
    id?: number;
    userName: string;
    password: string;
    nickName?: string;
    gender: number;
    picture?: string;
    city?: string;
}

export interface UserModel extends IUser, Model {};

type UserModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel;
  }

export const DefinedUser = <UserModelStatic>seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: 'unique user name',
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: 'password',
    },
    nickName: {
        type: STRING,
        allowNull: false,
    },
    gender: {
        type: TINYINT,
        allowNull: false,
        defaultValue: 3,
        comment: 'gender: 1-male, 2-female, 3-secret',
    },
    picture: {
        type: STRING,
        comment: 'pic url',
    },
    city: {
        type: STRING,
    },
});
