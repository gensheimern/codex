const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const TestError = require('./TestError');
const sinon = require('sinon');

chai.use(chaiAsPromised);
const { expect } = chai;
const asyncMiddleware = require('../routes/asyncMiddleware');

describe('async middleware wrapper', () => {
	it('should create an async middleware', async () => {
		const result = asyncMiddleware(async (req, res, next) => {
			req();
			res();
			next();
		});

		const reqMock = sinon.spy();
		const resMock = sinon.spy();
		const nextMock = sinon.spy();

		await result(reqMock, resMock, nextMock);

		expect(reqMock.calledOnce).to.be.true;
		expect(resMock.calledOnce).to.be.true;
		expect(nextMock.calledOnce).to.be.true;
	});

	it('should handle async errors', async () => {
		const mockError = new TestError('Test error');

		const handler = asyncMiddleware(async () => Promise.reject(mockError));

		const nextMock = sinon.spy();

		const result = handler(null, null, nextMock);

		// expect(result).to.eventually.be.rejectedWith(TestError);

		try {
			await result;
			expect(false, 'Error thrown').to.be.true;
		} catch (error) {
			expect(error, 'Correct error thrown').to.equal(mockError);
		}

		expect(nextMock.calledOnce, 'Next called').to.be.true;
		expect(nextMock.calledOnceWith(mockError), 'Correct error processed.').to.be.true;
	});

	it('should handle sync errors', async () => {
		const mockError = new TestError('Test error');

		const handler = asyncMiddleware(async () => {
			throw mockError;
		});

		const nextMock = sinon.spy();

		const result = handler(null, null, nextMock);

		// expect(result).to.eventually.be.rejectedWith(TestError);

		try {
			await result;
			expect(false, 'Error thrown').to.be.true;
		} catch (error) {
			expect(error, 'Correct error thrown').to.equal(mockError);
		}

		expect(nextMock.calledOnce, 'Next called').to.be.true;
		expect(nextMock.calledOnceWith(mockError), 'Correct error processed.').to.be.true;
	});
});
