/* const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const TestTools = require('./TestTools');

chai.use(chaiAsPromised);
const { expect } = chai;
const MessageController = require('../routes/activity/MessageController');
const messageModel = require('../models/MessageModel');
const participatesModel = require('../models/participatesModel');

function correctResponseType(res, status) {
	expect(res._isEndCalled(), 'End called').to.be.true;
	expect(res._getStatusCode(), 'Right status code').to.equal(status);
	expect(res._isJSON(), 'JSON response').to.be.true;
	expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
} */

describe('Message controller', () => {
	let mockModels;

	beforeEach(() => {
		mockModels = [];
	});

	afterEach(() => {
		mockModels.forEach(mockModel => mockModel.restore());
		mockModels = [];
	});


	describe('GET all messages of activity', () => {
		/* it('should send the data of all messages', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(
				messageModel, 'getMessagesOfActivity', null,
				[
					{
						Message_Id: 1,
						Date: new Date('2018-05-23T01:34:16.452Z'),
						Messagecontent: 'This is a test.',
						User_Id: 11,
						Firstname: 'Max',
						Name: 'Mustermann',
						Email: 'valid@email.com',
						Password: '12345',
						Image: '/image.png',
					}, {
						Message_Id: 2,
						Date: new Date('2018-05-25T01:34:16.452Z'),
						Messagecontent: 'This is a second test.',
						User_Id: 13,
						Firstname: 'Max2',
						Name: 'Mustermann2',
						Email: 'valid2@email.com',
						Password: '122345',
						Image: '/image2.png',
					},
				],
			));
			mockModels.push(TestTools.mockModel(participatesModel, 'isParticipant', null, true));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					activityId: 5,
				},
			});

			// Call test method
			await MessageController.getMessagesOfActivity(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body(), 'Correct response body').to.deep.equal([
				{
					id: 1,
					time: '2018-05-23T05:34:16.452Z',
					content: 'This is a test.',
					author: {
						id: 11,
						firstName: 'Max',
						name: 'Mustermann',
						email: 'valid@email.com',
						image: '/image.png',
					},
				}, {
					id: 2,
					time: '2018-05-25T05:34:16.452Z',
					content: 'This is a second test.',
					author: {
						id: 13,
						firstName: 'Max2',
						name: 'Mustermann2',
						email: 'valid2@email.com',
						image: '/image2.png',
					},
				},
			]);
		}); */
	});
});
