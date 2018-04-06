const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const http = require('http').Server(app);
const path = require('path');
const group = require('./routes/Group');
const user = require('./routes/User');

app.use(bodyParser.json());

app.use('/group', group);
app.use('/user', user);

// Middlewares
app.use(serveStatic(path.join(__dirname + "/frontend/build")));

// Start Server
http.listen(5000, function() {
	console.log('Server started: http://localhost:5000');
});
