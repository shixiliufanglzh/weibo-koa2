/**
 * @description cantants
 */

export const DEFAULT_AVATAR = '/imgs/avator_default.jpg';
export const PAGE_SIZE = 10;
// Reg - match '@nickName - userName'
// export const REG_FOR_AT_WHO = /@(.+?)\s/g;
export const REG_FOR_AT_WHO = /@(.+?)\s-\s(\w+?)\b/g;
export const OSS_CONFIG = {
    region: '',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
};
export const TARGET_OSS_FOLDER = {
    avatar: 'avatar/',
    blog: 'blogPicture/',
};
export const WATERMARK_PREFIX = '-websiteMark';
