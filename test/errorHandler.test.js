const chai = require('chai');
const TestTools = require('./TestTools');
const TestError = require('./TestError');
const sinon = require('sinon');

const { expect } = chai;
const errorHandler = require('../middleware/errorHandler');

describe('route error handler', () => {
	it('should handle errors by sending status 500', () => {
		const { req, res } = TestTools.mockRequest();
		const error = new TestError('Test error.');
		const next = sinon.spy();

		errorHandler(error, req, res, next);

		expect(next.calledOnce).to.be.true;
		expect(res._isEndCalled(), 'End called').to.be.true;
		expect(res._getStatusCode(), 'Right status code').to.equal(500);
		expect(res._isJSON(), 'JSON response').to.be.true;
		expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
		expect(res.body().errorCode, 'Correct error code').to.equal(500);
		expect(res.body().message, 'Message set').to.be.a('string');
	});
});
