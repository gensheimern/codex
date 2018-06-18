const sinon = require('sinon');
const mock = require('node-mocks-http');
const TestError = require('./TestError');
const LiveSync = require('../routes/LiveSync');

const dbConnection = require('../models/DatabaseConnection');

const token = {
	userId: 5,
	firstName: 'Max',
	name: 'Mustermann',
	email: 'valid@email.de',
};

const defaultDBServerVars = {
	fieldCount: 0,
	affectedRows: 0,
	insertId: 0,
	serverStatus: 2,
	warningCount: 0,
	message: '',
	protocol41: true,
	changedRows: 0,
};

const TestTools = {
	token,

	dbSelectEmpty: [],

	dbInsertSuccess: {
		...defaultDBServerVars,
		affectedRows: 1,
		insertId: 10,
	},

	dbInsertFailed: {
		...defaultDBServerVars,
		affectedRows: 0,
	},

	dbUpdateSuccess: {
		...defaultDBServerVars,
		affectedRows: 1,
		message: '(Rows matched: 1  Changed: 1  Warnings: 0',
		changedRows: 1,
	},

	dbUpdateFailed: {
		...defaultDBServerVars,
		message: '(Rows matched: 0  Changed: 0  Warnings: 0',
	},

	dbDeleteSuccess: {
		...defaultDBServerVars,
		affectedRows: 1,
	},

	dbDeleteFailed: {
		...defaultDBServerVars,
	},

	mockLiveSync(method) {
		return sinon.stub(LiveSync, method);
	},

	mockDatabase(options = {}) {
		if (!(options instanceof Object)) {
			throw new TestError('Invalid options parameter.');
		}

		const mockDB = sinon.mock(dbConnection);

		const query = options.query || '';
		const result = options.result || null;
		const error = options.error || null;

		if (options.params) {
			mockDB.expects('query')
				.withArgs(query, options.params)
				.callsArgWith(2, error, result);
		} else {
			mockDB.expects('query')
				.withArgs(query)
				.callsArgWith(1, error, result);
		}

		return mockDB;
	},

	mockModel(model, method, error, result) {
		return error
			? sinon.stub(model, method).rejects(error)
			: sinon.stub(model, method).resolves(result);
	},

	mockNotCalled(model, method) {
		return sinon.stub(model, method).throws(new TestError('Should not be called.'));
	},

	mockRequest(options = {}, withToken = true) {
		const params = {
			...options,
			headers: options.headers || { 'content-type': 'application/json' },
			url: options.url || '/',
			method: options.method || 'GET',
			params: options.params || {},
		};

		if (withToken) params.token = token;

		const mockRequest = mock.createRequest(params);
		const mockResponse = mock.createResponse();

		mockResponse.body = () => JSON.parse(mockResponse._getData());

		return {
			req: mockRequest,
			res: mockResponse,
		};
	},
};

module.exports = TestTools;
