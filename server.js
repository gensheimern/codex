/* eslint-disable no-console */
const app = require('./app');
const http = require('http').Server(app);
const config = require('./config');
const { createLiveMessage } = require('./LiveMessages');

const liveMessages = createLiveMessage(http);
liveMessages.initialize();


// Start Server
http.listen(config.PORT, () => {
	console.log(`Server started: http://localhost:${config.PORT}\n`);

	if (config.JWT_SECRET === 'secret') {
		console.warn('\x1b[33m%s\x1b[0m%s', 'WARNING:', ' Use default jwt secret only in development!');
	}
});

process.on('SIGINT', () => {
	// TODO: Cleanup
	console.log('Server terminated.');
	process.exit();
});
