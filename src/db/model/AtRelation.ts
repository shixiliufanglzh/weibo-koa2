/**
 * @description the model of `at` relation
 */

import { Model, INTEGER, BuildOptions, BOOLEAN } from 'sequelize';
import seq from '../seq';

export interface IAtRelation {
    id?: number;
    userId: number;
    blogId: number;
    isRead: boolean;
}

export interface AtRelationModel extends IAtRelation, Model {};

type AtRelationModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): AtRelationModel;
  }

export const AtRelation = <AtRelationModelStatic>seq.define(
    'atRelation',
    {
        userId: {
            type: INTEGER,
            allowNull: false,
        },
        blogId: {
            type: INTEGER,
            allowNull: false,
        },
        isRead: {
            type: BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
);
