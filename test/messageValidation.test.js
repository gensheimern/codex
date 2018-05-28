const chai = require('chai');

const { expect } = chai;
const messageValidation = require('../routes/activity/messageValidation');


describe('Message validation', () => {
	describe('validate message', () => {
		it('should accept valid message', () => {
			const message = 'Grillmasters';
			const result = messageValidation.validMessage(message);
			expect(result, 'Correct validation').to.be.true;
		});

		it('should reject no value', () => {
			const result = messageValidation.validMessage();
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject invalid teamname', () => {
			const result = messageValidation.validMessage('');
			expect(result, 'Correct validation').to.be.false;
		});
	});

	describe('validate message content', () => {
		it('should accept valid message content', () => {
			const result = messageValidation.validMessageContent('Was geht hier?');
			expect(result, 'Correct validation').to.be.true;
		});

		it('should reject no value', () => {
			const result = messageValidation.validMessageContent();
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject too short message content', () => {
			const result = messageValidation.validMessageContent('');
			expect(result, 'Correct validation').to.be.false;
		});
	});
});
