const liveMessages = require('../LiveMessages');
const ParticipatesModel = require('../models/participatesModel');
const MessageModel = require('../models/MessageModel');
const ActivityModel = require('../models/ActivityModel');
const memberModel = require('../models/MemberModel');
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

	async upcomingEvent(activityId) {
		try {
			const activity = await ActivityModel.getActivityById(activityId);
			const member = await ParticipatesModel.getMemberOfActivity(activityId);

			const hours = activity.Time.getHours();
			let minutes = activity.Time.getMinutes();
			if (minutes <= 9) {
				minutes = `0${minutes}`;
			}

			send('reminder', {
				event: activityId,
				message: `Event '${activity.Name}' is due in 30 minutes (${hours}:${minutes}).`,
			}, member.map(user => user.User_Id));
		} catch (error) {
			logError(error);
		}
	},

	async newEvent() {
		//
	},

	async teamChanged(userId) {
		try {
			send('teamsChanged', null, userId);
		} catch (error) {
			logError(error);
		}
	},

	async teamAllChanged(teamId) {
		try {
			const member = await memberModel.getMemberOfTeam(teamId);
			send('teamsChanged', null, member.map(user => user.User_Id));
		} catch (error) {
			logError(error);
		}
	},

	async participantsChanged(eventId) {
		try {
			const isPrivate = await ActivityModel.isPrivate(eventId);
			const dbParticipants = await ParticipatesModel.getMemberOfActivity(eventId);
			const participants = dbParticipants.map(transforms(null).transformUser);

			send(`participantsChanged-${eventId}`, participants, isPrivate ? participants.map(user => user.id) : 'all');
		} catch (error) {
			logError(error);
		}
	},

	async personalChanged(userId) {
		send('personalEventsChanged', null, userId);
	},

	async changedSettings() {
		//
	},

	async newNotification() {
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
			send(`messagesChangedApp-${eventId}`, messages, isPrivate ? participants.map(user => user.User_Id) : 'all');
		} catch (error) {
			logError(error);
		}
	},

};


module.exports = LiveSync;
