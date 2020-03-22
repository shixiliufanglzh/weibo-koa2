/**
 * @description follow/unfollow/getFollowers/getfollowing api test
 */

import server from '../server';
import { IUser } from '../../src/db/model';
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

// testUser_1 unfollow testUser_2
test('user(testUser_1) follow user(testUser_2)', async () => {
    const res = await server
        .post('/api/profile/unfollow')
        .send({userId: testUser_2.id})
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
})

//===========================================
// remove user testUser_1
// delete testUser_1
test('delete user testUser_1', async () => {
    const res = await server
        .post('/api/user/delete')
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
})

// log out testUser_1
test('log out testUser_1', async () => {
    const res = await server
        .post('/api/user/logout')
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
})


//===========================================
// remove user testUser_2
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

// delete testUser_2
test('delete user testUser_2', async () => {
    const res = await server
        .post('/api/user/delete')
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
})

// log out testUser_2
test('log out testUser_2', async () => {
    const res = await server
        .post('/api/user/logout')
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
})
