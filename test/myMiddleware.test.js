const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const myMiddleware = require('../middleware/myMiddleware');

describe('me-middleware', () => {
	it('should replace my in userId', () => {
		const mockRequest = {
			token: {
				userId: 5,
			},
			params: {
				userId: 'my',
			},
		};

		const mockNext = sinon.spy();

		myMiddleware(mockRequest, null, mockNext);

		expect(mockNext.calledOnce).to.be.true;
		expect(mockRequest.params.userId).to.equal(5);
	});

	it('should replace me in userId', () => {
		const mockRequest = {
			token: {
				userId: 5,
			},
			params: {
				userId: 'me',
			},
		};

		const mockNext = sinon.spy();

		myMiddleware(mockRequest, null, mockNext);

		expect(mockNext.calledOnce).to.be.true;
		expect(mockRequest.params.userId).to.equal(5);
	});

	it('should not change other values in userId', () => {
		const mockRequest = {
			token: {
				userId: 5,
			},
			params: {
				userId: 1,
			},
		};

		const mockNext = sinon.spy();

		myMiddleware(mockRequest, null, mockNext);

		expect(mockNext.calledOnce).to.be.true;
		expect(mockRequest.params.userId).to.equal(1);
	});

	it('should not change values in teamId', () => {
		const mockRequest = {
			token: {
				userId: 5,
			},
			params: {
				teamId: 'me',
			},
		};

		const mockNext = sinon.spy();

		myMiddleware(mockRequest, null, mockNext);

		expect(mockNext.calledOnce).to.be.true;
		expect(mockRequest.params.teamId).to.equal('me');
	});
});
