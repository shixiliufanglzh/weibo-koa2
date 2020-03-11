import { DefinedUser } from "../../src/db/model";

 /**
  * @description user model test
  */

test('user model attributes test', async () => {
    // would not save to db
    const user = DefinedUser.build({
        userName: 'zhangsan',
        password: '123',
        nickName: '张三',
        // gender: 1,
        picture: '/xxx.png',
        city: 'shanghai'
    })

    expect(user.userName).toBe('zhangsan');
    expect(user.password).toBe('123');
    expect(user.nickName).toBe('张三');
    expect(user.gender).toBe(3);
    expect(user.picture).toBe('/xxx.png');
    expect(user.city).toBe('shanghai');
})