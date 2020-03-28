import * as OSS from 'ali-oss';
import { OSS_CONFIG } from '../conf/constants';

const client = new OSS(OSS_CONFIG);

export async function put(targetPath: string, localFilePath: string) {
    try {
        // object表示上传到OSS的Object名称，localfile表示本地文件或者文件路径
        const r1: any = await client.put(targetPath, localFilePath);
        return r1.url;
        // console.log('put success: %j', r1);
        // const r2 = await client.get(fileName);
        // console.log('get success: %j', r2);
    } catch (err) {
        console.error('error: %j', err);
    }
};
