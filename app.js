const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');
// const mail = require('./mailservice/mailservice');
const authenticateRouter = require('./routes/auth/AuthenticateRouter');
const { verifyMiddleware } = require('./routes/auth/Auth');
const apiRouter = require('./routes/MainRouter');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(serveStatic(path.join(`${__dirname}/image/user`)));
app.use(serveStatic(path.join(`${__dirname}/image/activity`)));
app.use(serveStatic(path.join(`${__dirname}/image/activity/card`)));
app.use(serveStatic(path.join(`${__dirname}/frontend/build`)));
app.use(bodyParser.json());

// API routes
const apiPath = '/api';
app.use(`${apiPath}/authenticate`, authenticateRouter);
app.use(apiPath, verifyMiddleware, apiRouter);

app.use(errorHandler);

app.get('/*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/frontend/build/index.html`));
});

// app.use('/mail', verifyMiddleware, mail);


module.exports = app;
