import { Model, BuildOptions, STRING, DECIMAL, INTEGER, TEXT } from 'sequelize';
import seq from '../seq';

export interface IBlog {
    id?: number;
    userId: number;
    content: string;
    image: string;
    createdAtFormat?: string;
    updatedAtFormat?: string;
    contentFormat?: string;
}

export interface BlogModel extends IBlog, Model {};

type BlogModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): BlogModel;
  }

export const Blog = <BlogModelStatic>seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: 'user id',
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: 'blog content',
    },
    image: {
        type: STRING,
        comment: 'blog image',
    },
});
