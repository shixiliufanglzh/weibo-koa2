/**
 * @description sequelize synchronize database
*/

import seq from './seq';

// require('../model')

// test connection
seq.authenticate().then(() => {
    console.log('auth ok');
}).catch(() => {
    console.log('auth err');
});

// execute synchronization
seq.sync({force: true}).then(() => {
    console.log('sync ok');
    process.exit();
});
