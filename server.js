/* eslint-disable no-console */
const app = require('./app');
const http = require('http').Server(app);


// Start Server
http.listen(5000, () => {
	console.log('Server started: http://localhost:5000');
});

process.on('SIGINT', () => {
	// TODO: Cleanup
	console.log('Server terminated.');
	process.exit();
});
