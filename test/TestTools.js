const sinon = require('sinon');
const mock = require('node-mocks-http');

const dbConnection = require('../models/DatabaseConnection');

const token = {
	User_Id: 5,
	Firstname: 'Max',
	Name: 'Mustermann',
	Email: 'valid@email.de'
}

const defaultDBServerVars = {
	fieldCount: 0,
	affectedRows: 0,
	insertId: 0,
	serverStatus: 2,
	warningCount: 0,
	message: '',
	protocol41: true,
	changedRows: 0,
}

const TestTools = {
	dbSelectEmpty: [],

	dbInsertSuccess: {
		...defaultDBServerVars,
		affectedRows: 1,
		insertId: 10,
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


	mockDatabase(options = {}) {
		if(!options instanceof Object)
			throw new Error("Invalid options parameter.");

		let mockDB = sinon.mock(dbConnection);

		let query = options.query || "",
			result = options.result || null,
			error = options.error || null;

		if(options.params) {
			mockDB.expects('query')
			.withArgs(query, options.params)
			.callsArgWith(2, error, result);
		}
		else {
			mockDB.expects('query')
			.withArgs(query)
			.callsArgWith(1, error, result);
		}
		
		return mockDB;
	},

	mockModel(model, method, error, result) {
		//return sinon.stub(model, method).yields(error, result);
		return error
			? sinon.stub(model, method).rejects(error)
			: sinon.stub(model, method).resolves(result);
	},

	mockNotCalled(model, method) {
		return sinon.stub(model, method).throws("Should not be called.");
	},

	mockRequest(options = {}) {
		options.token = token;
		options.headers = options.headers || {
			"content-type": "application/json"
		};
		options.url = options.url || '/';
		options.method = options.method || 'GET';


		return mock.createRequest(options);
	},

	mockResponse(options) {
		return mock.createResponse(options);
	}
}

module.exports = TestTools;