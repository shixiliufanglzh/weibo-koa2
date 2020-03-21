import { IUser, User, UserModel } from './User';
import { IBlog, Blog, BlogModel } from './Blog';
import {
    IUserRelation, UserRelation, UserRelationModel,
} from './UserRelation';

Blog.belongsTo(User, {
    foreignKey: 'userId',
});
User.hasMany(UserRelation, {
    foreignKey: 'followerId',
});
UserRelation.belongsTo(User, {
    foreignKey: 'userId',
});
Blog.belongsTo(UserRelation, {
    foreignKey: 'userId',
    targetKey: 'userId',
});

export {
    IUser,
    User,
    UserModel,
    IUserRelation,
    UserRelation,
    UserRelationModel,
    IBlog,
    Blog,
    BlogModel,
};
