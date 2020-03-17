import { IUser, DefinedUser, UserModel } from './User';
import { IBlog, DefinedBlog, BlogModel } from './Blog';
import {
    IUserRelation, DefinedUserRelation, UserRelationModel,
} from './UserRelation';

DefinedBlog.belongsTo(DefinedUser, {
    foreignKey: 'userId',
});
DefinedUser.hasMany(DefinedUserRelation, {
    foreignKey: 'follower',
});
DefinedUserRelation.belongsTo(DefinedUser, {
    foreignKey: 'userId',
});

export {
    IUser,
    DefinedUser,
    UserModel,
    IUserRelation,
    DefinedUserRelation,
    UserRelationModel,
    IBlog,
    DefinedBlog,
    BlogModel,
};
