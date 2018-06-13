const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');
// const mail = require('./mailservice/mailservice');
const authenticateRouter = require('./routes/auth/AuthenticateRouter');
const authenticateRestaurantRouter = require('./routes/authRestaurant/AuthenticateRouter');
const { verifyMiddleware } = require('./routes/auth/Auth');
const { verifyMiddlewareRestaurant } = require('./routes/auth/Auth');
const apiRouter = require('./routes/MainRouter');
const apiRouterRestaurant = require('./routes/MainRouterRestaurant');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

// Middlewares

app.use(cors());
app.use(serveStatic(path.join(`${__dirname}/image/user`)));
app.use(serveStatic(path.join(`${__dirname}/image/lunch`)));
app.use(serveStatic(path.join(`${__dirname}/image/activity`)));
app.use(serveStatic(path.join(`${__dirname}/image/activity/card`)));
app.use(serveStatic(path.join(`${__dirname}/frontend/build`)));

app.use(bodyParser.json());

// API routes
const apiPath = '/api';
app.use(fileUpload());
app.post(`${apiPath}/upload`, (req, res) => {
	if (!req.files) {
		return res.status(400).send('No files were uploaded.');
	}
	console.log(req.files);
	const { image } = req.files;
		console.log(image);
image.mv(`${__dirname}/image/lunch/` + image.name, (err) => {
		if (err) {
			return res.status(500).send(err);
		}
		return res.send('File uploaded!');
	});
	return true;
});



app.use(`${apiPath}/authenticate`, authenticateRouter);
app.use(`${apiPath}/authenticateRestaurant`, authenticateRestaurantRouter);

app.use(apiPath, verifyMiddleware, apiRouter);
app.use(apiPath, verifyMiddlewareRestaurant, apiRouterRestaurant);

app.use(errorHandler);

app.get('/*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/frontend/build/index.html`));
});

// app.use('/mail', verifyMiddleware, mail);


module.exports = app;
