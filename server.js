const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const http = require('http').Server(app);
const path = require('path');

// Middlewares
app.use(bodyParser.json());

app.use(serveStatic(path.join(__dirname + "/frontend/build")));

/*app.get("/", (req, res) => {
	res.status(200).end("Hello World!");
});*/

// Start Server
http.listen(3000, function() {
	console.log('Server started: http://localhost:3000');
});
