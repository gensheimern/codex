/* eslint-disable no-console */
const os = require('os');
const fs = require('fs');
const app = require('./app');
const http = require('http');
const https = require('https');
const config = require('./config');
const { createLiveMessage } = require('./LiveMessages');

const onStart = () => {
	console.log(`Server started: https://${os.hostname()}:${process.env.NODE_ENV === 'production' ? config.SECURE_PORT : config.PORT}\n`);

	// Print a warning if default jwt secret is used, because it may cause vulnerabilities.
	if (config.JWT_SECRET === 'secret') {
		console.warn('\x1b[33m%s\x1b[0m%s', 'WARNING:', ' Use default jwt secret only in development!');
	}
};

if (process.env.NODE_ENV === 'production' && config.HTTPS) {
	// Start HTTPS Server for production
	const credentials = {
		key: fs.readFileSync(config.PRIVKEY_PATH, 'utf8'),
		cert: fs.readFileSync(config.FULLCHAIN_PATH, 'utf8'),
	};

	// Start HTTP Server to redirect to HTTPS
	http.createServer((req, res) => {
		res.writeHead(301, {
			Location: `https://${req.headers.host}${req.url}`,
		});
		res.end();
	}).listen(config.PORT);

	// Start HTTPS Server for production
	const httpsServer = https.createServer(credentials, app);
	httpsServer.listen(config.SECURE_PORT, onStart);

	const liveMessages = createLiveMessage(httpsServer);
	liveMessages.initialize();
} else {
	// Start HTTP Server
	const httpServer = http.createServer(app);
	httpServer.listen(config.PORT, onStart);

	const liveMessages = createLiveMessage(httpServer);
	liveMessages.initialize();
}

// Handles server interruption and displays exit message.
process.on('SIGINT', () => {
	console.log('Server terminated.');
	process.exit();
});
