const asyncMiddleware = fn => (req, res, next) => {
	const returnValue = fn(req, res, next);

	if (returnValue && returnValue.catch) {
		returnValue.catch((error) => {
			next(error);
		});
	}

	return returnValue;
};

module.exports = asyncMiddleware;
