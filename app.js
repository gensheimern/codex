const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');
// const mail = require('./mailservice/mailservice');
const authenticateRouter = require('./routes/auth/AuthenticateRouter');
const restaurantRouter = require('./routes/restaurant/RestaurantRouter');
const { verifyMiddleware } = require('./routes/auth/Auth');
const apiRouter = require('./routes/MainRouter');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const fileUpload = require('express-fileupload');



const app = express();

// Middlewares

app.use(cors());
app.use(serveStatic(path.join(`${__dirname}/image/user`)));
app.use(serveStatic(path.join(`${__dirname}/image/imageupload`)));
app.use(serveStatic(path.join(`${__dirname}/image/activity`)));
app.use(serveStatic(path.join(`${__dirname}/image/activity/card`)));
app.use(serveStatic(path.join(`${__dirname}/frontend/build`)));

app.use(bodyParser.json());

// API routes
const apiPath = '/api';
app.use(`${apiPath}/restaurant`, restaurantRouter);
app.use(fileUpload());
app.post(`${apiPath}/upload`, function(req, res) {
	console.log(`${apiPath}/upload`);
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`${__dirname}/image/user/test.jpg`, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});
app.use(`${apiPath}/authenticate`, authenticateRouter);
app.use(apiPath, verifyMiddleware, apiRouter);






app.use(errorHandler);

app.get('/*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/frontend/build/index.html`));
});

// app.use('/mail', verifyMiddleware, mail);


module.exports = app;
