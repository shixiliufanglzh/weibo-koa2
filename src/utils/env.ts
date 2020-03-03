const ENV = process.env.NODE_ENV;

export const isDev = ENV === 'dev';
export const isProd = ENV === 'production';
export const isTest = ENV === 'test';
