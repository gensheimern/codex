const messageValidation = {
	validMessage(message) {
		return messageValidation.validMessageContent(message);
	},

	validMessageContent(content) {
		return typeof content === 'string'
			&& content.length > 0;
	},
};

module.exports = messageValidation;
