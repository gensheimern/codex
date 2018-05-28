const myMiddleware = (req, res, next) => {
	if (req.params.userId === 'my' && req.token) {
		req.params.userId = req.token.userId;
	}

	if (req.params.userId === 'me' && req.token) {
		req.params.userId = req.token.userId;
	}

	next();
};

module.exports = myMiddleware;
