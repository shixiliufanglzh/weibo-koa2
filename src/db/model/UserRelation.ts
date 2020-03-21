/**
 * @description the model of following relationship between users
 */

import { Model, BuildOptions, STRING, TINYINT, INTEGER } from 'sequelize';
import seq from '../seq';

export interface IUserRelation {
    id?: number;
    userId: number;
    followerId: number;
}

export interface UserRelationModel extends IUserRelation, Model {};

type UserRelationModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserRelationModel;
  }

export const UserRelation = <UserRelationModelStatic>seq.define(
    'userRelation',
    {
        userId: {
            type: INTEGER,
            allowNull: false,
            comment: 'the user who is followed',
        },
        followerId: {
            type: INTEGER,
            allowNull: false,
            comment: 'the user who is following',
        },
    },
);
