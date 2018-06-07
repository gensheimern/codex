/* eslint-disable no-console */
/* eslint-disable-next-line no-unused-vars */
const errorHandler = (err, req, res, next) => {
	res.status(500).json({
		errorCode: 500,
		message: 'Internal server error',
	});

	// TODO: Log error somewhere
	console.error(err);

	next();
};

module.exports = errorHandler;
