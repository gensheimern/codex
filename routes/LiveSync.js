const liveMessages = require('../LiveMessages');
const ParticipatesModel = require('../models/participatesModel');
const MessageModel = require('../models/MessageModel');
const ActivityModel = require('../models/ActivityModel');
const transforms = require('../routes/transforms');

function send(topic, message, receiver) {
	liveMessages.getLiveMessage()
		.publish(topic, message, receiver);
}

function logError(error) {
	/* eslint-disable no-console */
	console.log('An error occured in LiveSync - message changed:');
	console.error(error);
	console.log('This will not terminate the service, because it does not affect the general functionality of the application. For further details see the LiveSync documentation.');
	/* eslint-enable no-console */
}

const LiveSync = {

	async addNotification(userId, type, title, message) {
		send('notification', {
			type,
			title,
			message,
		}, userId);
	},

	async globalMessage(title) {
		send('globalMessage', title, 'all');
	},

	async newEvent() {
		//
	},

	async newGroup() {
		//
	},

	async newMember() {
		//
	},

	async newParticipant() {
		//
	},

	async changedSettings() {
		//
	},

	async newNotification() {
		//
	},

	async personalChanged() {
		//
	},

	async organizationChanged() {
		//
	},

	async newOrganization() {
		//
	},

	async messageChanged(eventId) {
		try {
			const isPrivate = await ActivityModel.isPrivate(eventId);
			const participants = await ParticipatesModel.getMemberOfActivity(eventId);
			const dbMessages = await MessageModel.getMessagesOfActivity(eventId);
			const messages = dbMessages.map(transforms(null).transformMessage);

			send(`messagesChanged-${eventId}`, messages, isPrivate ? participants.map(user => user.User_Id) : 'all');
		} catch (error) {
			logError(error);
		}
	},

};


module.exports = LiveSync;
