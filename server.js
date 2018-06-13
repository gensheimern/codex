/* eslint-disable no-console */
const os = require('os');
const app = require('./app');
const http = require('http').Server(app);
const config = require('./config');
const { createLiveMessage } = require('./LiveMessages');

const liveMessages = createLiveMessage(http);
liveMessages.initialize();


// Start Server
http.listen(config.PORT, () => {
	console.log(`Server started: http://${os.hostname()}:${config.PORT}\n`);

	// Print a warning if default jwt secret is used, because it may cause vulnerabilities.
	if (config.JWT_SECRET === 'secret') {
		console.warn('\x1b[33m%s\x1b[0m%s', 'WARNING:', ' Use default jwt secret only in development!');
	}
});

// Handles server interruption and displays exit message.
process.on('SIGINT', () => {
	console.log('Server terminated.');
	process.exit();
});
