/**
 * @description jest server
 * @author shixiliufanglzh
 **/

import * as request from 'supertest';
import app from '../src/app';
const server = app.callback();

export default request(server);