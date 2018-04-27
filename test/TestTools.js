const sinon = require('sinon');
const mock = require('node-mocks-http');

const dbConnection = require('../models/DatabaseConnection');

const token = {
	User_Id: 1,
	Firstname: 'Max',
	Name: 'Mustermann',
	Email: 'valid@email.de'
}

const TestTools = {
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

	mockModel(model, method, error, result, paramNr) {
		return sinon.stub(model, method).yields(error, result);
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