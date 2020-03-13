/**
  * @description user model test
  */
import { DefinedBlog } from "../../src/db/model";


test('blog model attributes test', async () => {
    // would not save to db
    const user = DefinedBlog.build({
        userId: 1,
        content: '123',
        image: '/xxx.png'
    })

    expect(user.userId).toBe(1);
    expect(user.content).toBe('123');
    expect(user.image).toBe('/xxx.png');
})