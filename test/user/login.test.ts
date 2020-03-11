/**
 * @description login api test
 */

import server from '../server';


const userName = `u_${Date.now()}`;
const password = `p_${Date.now()}`;
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}
let COOKIE = '';

// test api register
test('register test', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser);
    expect(res.body.errno).toBe(0);
})

//test api register with existed user
test('register existed user test', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser);
    expect(res.body.errno).not.toBe(0);
})

//test api that judge if user exist
test('check if user exist test', async () => {
    const res = await server
        .post('/api/user/isExist')
        .send({userName: testUser.userName});
    expect(res.body.errno).toBe(0);
})

// test validation that check format json schema
test('check user json schema', async () => {
    const res = await server
        .post('/api/user/register')
        .send({
            userName: '12',
            password: '1',
            nickName: userName,
            gender: 'male'
        });
    expect(res.body.errno).not.toBe(0);
})

// test api login
test('login test', async () => {
    const res = await server
        .post('/api/user/login')
        .send({
            userName: testUser.userName,
            password: testUser.password
        });
    expect(res.body.errno).toBe(0);
    COOKIE = res.header['set-cookie'].join(';')
})

// change base info
test('change info test', async () => {
    const res = await server
        .patch('/api/user/changeInfo')
        .send({
            userName: 'test_name',
            picture: '/xxx.png',
            city: 'shanghai or beijing'
        })
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
})

// change password
test('change password', async () => {
    const res = await server
        .patch('/api/user/changePassword')
        .send({
            userName: 'test_name',
            password: testUser.password,
            newPassword: `p_${Date.now()}`,
        })
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
})

// test delete user
test('delete user test', async () => {
    const res = await server
        .post('/api/user/delete')
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
})

// log out
test('log out test', async () => {
    const res = await server
        .post('/api/user/logout')
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
})

//test api that judge if user exist
test('after deletion, check if user exist', async () => {
    const res = await server
        .post('/api/user/isExist')
        .send({userName: testUser.userName});
    expect(res.body.errno).not.toBe(0);
})
