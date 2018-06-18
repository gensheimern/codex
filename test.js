/* eslint-disable */

const Auth = require('./routes/auth/Auth');

Auth.hashPassword('MaxDerBoss1998').then(console.log);


Auth.hashPassword('1234').then(console.log);
