import { IUser, DefinedUser, UserModel } from './User';
import { IBlog, DefinedBlog, BlogModel } from './Blog';

DefinedBlog.belongsTo(DefinedUser, {
    foreignKey: 'userId',
});

export {
    IUser,
    DefinedUser,
    UserModel,
    IBlog,
    DefinedBlog,
    BlogModel,
};
