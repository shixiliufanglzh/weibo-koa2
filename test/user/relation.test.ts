/**
 * @description follow/unfollow/getFollowers/getfollowing api test
 */

import server from '../server';
import { IUser, IBlog } from '../../src/db/model';
import { getFollowers, getFollowing } from '../../src/controllers/user-relation';


const testUser_1: IUser = {
    userName: `u_${Date.now()}_1`,
    password: `p_${Date.now()}_1`,
    nickName: `n_${Date.now()}_1`,
    gender: 1
}
const testUser_2: IUser = {
    userName: `u_${Date.now()}_2`,
    password: `p_${Date.now()}_2`,
    nickName: `n_${Date.now()}_2`,
    gender: 1
}
let COOKIE = '';  // for testUser_1

// test api register
test('register user testUser_1', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser_1);
    expect(res.body.errno).toBe(0);
    testUser_1.id = res.body.data.id;
})
test('register user testUser_2', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser_2);
    expect(res.body.errno).toBe(0);
    testUser_2.id = res.body.data.id;
})

// login testUser_1
test('login user testUser_1', async () => {
    const res = await server
        .post('/api/user/login')
        .send({
            userName: testUser_1.userName,
            password: testUser_1.password
        });
    expect(res.body.errno).toBe(0);
    COOKIE = res.header['set-cookie'].join(';')
})

// testUser_1 follow testUser_2
test('user(testUser_1) follow user(testUser_2)', async () => {
    const res = await server
        .post('/api/profile/follow')
        .send({userId: testUser_2.id})
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
})

// get followers of testUser_2
test('get followers of user(testUser_2)', async () => {
    const {list, count} = (await getFollowers(testUser_2.id)).data;
    const hasSpeFollower = list.some((follower) => follower.id == testUser_1.id);
    expect(count>0).toBe(true);
    expect(hasSpeFollower).toBe(true);
})

// get following of testUser_1
test('get following of user(testUser_1)', async () => {
    const {list, count} = (await getFollowing(testUser_1.id)).data;
    const hasSpeFollowing = list.some((following) => following.id == testUser_2.id);
    expect(count>0).toBe(true);
    expect(hasSpeFollowing).toBe(true);
})

// get `at` list of testUser_1
test('get `at` list of user(testUser_1)', async () => {
    const res = await server
        .get('/api/user/getAtList')
        .set('cookie', COOKIE);
    const hasUserName = res.body.some((item: string) => {
        return item.indexOf(`- ${testUser_2.userName}`) > 0
    })
    expect(hasUserName).toBeTruthy();
})

const testBlog = {
    userId: 1,
    content: `c_${Date.now()} @${testUser_2.nickName} - ${testUser_2.userName}`,
    image: `i_${Date.now()}.png`,
}

let BLOG_ID: number = null;
// testUser_1 create blog @testUser_2
test('testUser_1 create blog and @testUser_2', async () => {
    const res = await server
        .post('/api/blog/create')
        .send(testBlog)
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
    expect(res.body.data.content).toBe(testBlog.content);
    expect(res.body.data.image).toBe(testBlog.image);
    BLOG_ID = res.body.data.id as number;
})

// testUser_1 unfollow testUser_2
test('user(testUser_1) unfollow user(testUser_2)', async () => {
    const res = await server
        .post('/api/profile/unfollow')
        .send({userId: testUser_2.id})
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
})

//===========================================
// remove user testUser_1
// delete testUser_1
// test('delete user testUser_1', async () => {
//     const res = await server
//         .post('/api/user/delete')
//         .set('cookie', COOKIE);
//     expect(res.body.errno).toBe(0);
// })

// log out testUser_1
test('log out testUser_1', async () => {
    const res = await server
        .post('/api/user/logout')
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
})


//=========================================== switch user
// login testUser_2
test('login user testUser_2', async () => {
    const res = await server
        .post('/api/user/login')
        .send({
            userName: testUser_2.userName,
            password: testUser_2.password
        });
    expect(res.body.errno).toBe(0);
    COOKIE = res.header['set-cookie'].join(';')
})

// load first page of atMe
test('load first page of blogs that `at` me', async () => {
    const res = await server
        .get(`/api/atMe/loadMore/0`)
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
    const data = res.body.data;
    const haveCurBlog = data.blogList.some((blog: IBlog) => blog.id === BLOG_ID)
    expect(data).toHaveProperty('isEmpty');
    expect(data).toHaveProperty('count');
    expect(data).toHaveProperty('pageSize');
    expect(data).toHaveProperty('pageIndex');
    expect(data).toHaveProperty('blogList');
})

// delete testUser_2
// test('delete user testUser_2', async () => {
//     const res = await server
//         .post('/api/user/delete')
//         .set('cookie', COOKIE);
//     expect(res.body.errno).toBe(0);
// })

// log out testUser_2
test('log out testUser_2', async () => {
    const res = await server
        .post('/api/user/logout')
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
})
