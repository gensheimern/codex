/* eslint-disable-next-line no-unused-vars */
const errorHandler = (err, req, res, next) => {
	res.status(500).json({
		errorCode: 500,
		message: 'Internal server error',
	});

	// TODO: Log error somewhere

	next();
};

const asyncMiddleware = fn => (req, res, next) => {
	const returnValue = fn(req, res, next);

	if (returnValue && returnValue.catch) {
		returnValue.catch((error) => {
			next(error);
		});
	}

	return returnValue;
};

module.exports = { errorHandler, asyncMiddleware };
