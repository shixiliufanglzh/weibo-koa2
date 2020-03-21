/**
 * @description blog homepage api test
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

const testBlog = {
    userId: 1,
    content: `c_${Date.now()}`,
    image: `i_${Date.now()}.png`,
}

// test api register
test('register test', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser);
    expect(res.body.errno).toBe(0);
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
    testBlog.userId = res.body.data.id;
    COOKIE = res.header['set-cookie'].join(';')
})

// test validation that check format json schema
test('check blog json schema', async () => {
    const res = await server
        .post('/api/blog/create')
        .send({
            userId: testBlog.userId,
            content: testBlog.content,
            image: `abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz
            abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz
            abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz
            abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz
            abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz`,
        })
        .set('cookie', COOKIE);
    expect(res.body.errno).not.toBe(0);
})

// test create blog
test('test blog creation', async () => {
    const res = await server
        .post('/api/blog/create')
        .send(testBlog)
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
    expect(res.body.data.content).toBe(testBlog.content);
    expect(res.body.data.image).toBe(testBlog.image);
})

// load first page of blogs in profile
test('load first page of blogs in profile', async () => {
    const res = await server
        .get(`/api/profile/loadMore/${testUser.userName}/0`)
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
    const data = res.body.data;
    expect(data).toHaveProperty('isEmpty');
    expect(data).toHaveProperty('count');
    expect(data).toHaveProperty('pageSize');
    expect(data).toHaveProperty('pageIndex');
    expect(data).toHaveProperty('blogList');
})

// load first page of blogs in square
test('load first page of blogs in square', async () => {
    const res = await server
        .get(`/api/square/loadMore/0`)
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
    const data = res.body.data;
    expect(data).toHaveProperty('isEmpty');
    expect(data).toHaveProperty('count');
    expect(data).toHaveProperty('pageSize');
    expect(data).toHaveProperty('pageIndex');
    expect(data).toHaveProperty('blogList');
})

// load first page of blogs in home page
test('load first page of blogs in home page', async () => {
    const res = await server
        .get(`/api/blog/loadMore/0`)
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
    const data = res.body.data;
    expect(data).toHaveProperty('isEmpty');
    expect(data).toHaveProperty('count');
    expect(data).toHaveProperty('pageSize');
    expect(data).toHaveProperty('pageIndex');
    expect(data).toHaveProperty('blogList');
})

// test delete user
// test('delete user test', async () => {
//     const res = await server
//         .post('/api/user/delete')
//         .set('cookie', COOKIE);
//     expect(res.body.errno).toBe(0);
// })

// log out
test('log out test', async () => {
    const res = await server
        .post('/api/user/logout')
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
})
