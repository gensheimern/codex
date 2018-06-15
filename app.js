const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const authenticateRouter = require('./routes/auth/AuthenticateRouter');
const authenticateRestaurantRouter = require('./routes/authRestaurant/AuthenticateRouter');
const { verifyMiddleware } = require('./routes/auth/Auth');
const { verifyMiddlewareRestaurant } = require('./routes/authRestaurant/Auth');
const apiRouter = require('./routes/MainRouter');
const apiRouterRestaurant = require('./routes/MainRouterRestaurant');
const UserController = require('./routes/user/UserController');
const apiRouterLunch = require('./routes/lunch/LunchRouter');
const errorHandler = require('./middleware/errorHandler');
const fileUpload = require('express-fileupload');
const RestaurantController = require('./routes/restaurant/RestaurantController');

const app = express();

/* Middlewares */
// Set security HTTP headers
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(helmet.contentSecurityPolicy({
	directives: {
		defaultSrc: ["'self'"],
		styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com'],
	},
	reportOnly: true,
}));
// Enable cors requests
app.use(cors());
// Enbalbe gzip compression for less traffic
app.use(compression());

// User static routing for images and frontend
app.use(serveStatic(path.join(`${__dirname}/image/user`)));
app.use(serveStatic(path.join(`${__dirname}/image/lunch`)));
app.use(serveStatic(path.join(`${__dirname}/image/activity`)));
app.use(serveStatic(path.join(`${__dirname}/image/activity/card`)));
app.use(serveStatic(path.join(`${__dirname}/image/activity/eventImagePick`)));
app.use(serveStatic(path.join(`${__dirname}/frontend/build`)));

app.use(bodyParser.json());

/* API routes */
const apiPath = '/api';

/* Upload API */
app.use(fileUpload());
app.post(`${apiPath}/upload/lunch`, (req, res) => {
	if (!req.files) {
		return res.status(400).send('No files were uploaded.');
	}

	const { image } = req.files;
	image.mv(`${__dirname}/image/lunch/${image.name}`, (err) => {
		if (err) {
			return res.status(500).send(err);
		}
		return res.send('File uploaded!');
	});
	return true;
});

app.post(`${apiPath}/upload/profile`, (req, res) => {
	if (!req.files) {
		return res.status(400).send('No files were uploaded.');
	}

	const { image } = req.files;
	image.mv(`${__dirname}/image/user/${image.name}`, (err) => {
		if (err) {
			return res.status(500).send(err);
		}
		return res.send('File uploaded!');
	});
	return true;
});


app.use(`${apiPath}/authenticate`, authenticateRouter);
app.post(`${apiPath}/user`, UserController.addUser);
app.use(`${apiPath}/authenticateRestaurant`, authenticateRestaurantRouter);

app.post(`${apiPath}/restaurant`, RestaurantController.addRestaurant);
app.use(`${apiPath}/restaurant`, verifyMiddlewareRestaurant, apiRouterRestaurant);
app.use(`${apiPath}/lunch`, verifyMiddleware, apiRouterLunch);

app.use(apiPath, verifyMiddleware, apiRouter);

/* User global error handler */
app.use(errorHandler);

/* Always send the index page to allow dynamic client routing */
app.get('/*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/frontend/build/index.html`));
});


module.exports = app;
