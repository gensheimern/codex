const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const authenticateRouter = require('./routes/auth/AuthenticateRouter');
const { verifyMiddleware } = require('./routes/auth/Auth');
const apiRouter = require('./routes/MainRouter');
const errorHandler = require('./middleware/errorHandler');

const app = express();

/* Middlewares */

// Set cors headers for api access
app.use(cors());
// Enbalbe gzip compression for less traffic
app.use(compression());
// User static routing for images and frontend
app.use(serveStatic(path.join(`${__dirname}/image/user`)));
app.use(serveStatic(path.join(`${__dirname}/image/activity`)));
app.use(serveStatic(path.join(`${__dirname}/image/activity/card`)));
app.use(serveStatic(path.join(`${__dirname}/image/activity/eventImagePick`)));
app.use(serveStatic(path.join(`${__dirname}/frontend/build`)));
app.use(bodyParser.json());

/* API routes */
const apiPath = '/api';
app.use(`${apiPath}/authenticate`, authenticateRouter);
app.use(apiPath, verifyMiddleware, apiRouter);

/* User global error handler */
app.use(errorHandler);

/* Always send the index page to allow dynamic client routing */
app.get('/*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/frontend/build/index.html`));
});


module.exports = app;
