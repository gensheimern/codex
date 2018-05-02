const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');
const mail = require('./mailservice/mailservice');

const jwt = require('jsonwebtoken');
const authenticate = require('./routes/auth/AuthenticateRouter');
const verifyToken = require('./routes/auth/verify');

// Middlewares
app.use(serveStatic(path.join(__dirname + "/image/user")));
app.use(serveStatic(path.join(__dirname + "/image/activity")));
app.use(serveStatic(path.join(__dirname + "/frontend/build")));
app.use(bodyParser.json());


app.use('/authenticate', authenticate);
app.use('/mail', verifyToken, mail);


const apiPath = "/";
const apiRouter = require('./routes/MainRouter');
app.use(apiPath, verifyToken, apiRouter);


module.exports = app;
