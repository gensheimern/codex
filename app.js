const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');
// const mail = require('./mailservice/mailservice');
const authenticateRouter = require('./routes/auth/AuthenticateRouter');
const { verifyMiddleware } = require('./routes/auth/Auth');

const app = express();

// Middlewares
app.use(serveStatic(path.join(`${__dirname}/image/user`)));
app.use(serveStatic(path.join(`${__dirname}/image/activity`)));
app.use(serveStatic(path.join(`${__dirname}/frontend/build`)));
app.use(bodyParser.json());

// API routes
const apiPath = '/';
app.use(`${apiPath}authenticate`, authenticateRouter);
const apiRouter = require('./routes/MainRouter');

app.use(apiPath, verifyMiddleware, apiRouter);app.get('', (req, res) => {
	//
});

// app.use('/mail', verifyMiddleware, mail);


module.exports = app;
