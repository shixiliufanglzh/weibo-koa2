import { IUser, DefinedUser, UserModel } from './User';
import { IBlog, DefinedBlog, BlogModel } from './Blog';
import {
    IUserRelation, DefinedUserRelation, UserRelationModel,
} from './UserRelation';

DefinedBlog.belongsTo(DefinedUser, {
    foreignKey: 'userId',
});
DefinedUser.hasMany(DefinedUserRelation, {
    foreignKey: 'followerId',
});
DefinedUserRelation.belongsTo(DefinedUser, {
    foreignKey: 'userId',
});
DefinedBlog.belongsTo(DefinedUserRelation, {
    foreignKey: 'userId',
    targetKey: 'userId',
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
