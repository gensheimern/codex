const ActivityModel = require('./models/ActivityModel');
const transforms = require('./routes/transforms')(null);
const liveSync = require('./routes/LiveSync');
const NotificationModel = require('./models/NotificationModel');
const mail = require('./routes/mail');
const ParticipatesModel = require('./models/participatesModel');
const config = require('./config');

async function remind(eventId) {
	// Send live message
	liveSync.upcomingEvent(eventId);

	// Send notification
	const event = await ActivityModel.getActivityById(eventId);
	const hours = event.Time.getHours();
	let minutes = event.Time.getMinutes();
	if (minutes <= 9) {
		minutes = `0${minutes}`;
	}
	NotificationModel.notifyEvent(eventId, 'reminder', 'Reminder', `Event '${event.Activityname}' is due in 30 minutes (${hours}:${minutes}).`, eventId, null);

	// Send reminder mail
	const participants = await ParticipatesModel.getMemberOfActivity(eventId);
	const eventUrl = `${config.HOST}/notifications`;
	participants.forEach((user) => {
		mail.sendReminderMail(user.Email, 'Meet\'n\'Eat Reminder', event.Activityname, `${hours}:${minutes}`, eventUrl)
			.catch(() => {});
	});
}

(async () => {
	// Initialize reminders for existing events
	const dbActivities = await ActivityModel.getAllActivitiesWithoutChecks();
	const activities = dbActivities.map(transforms.transformActivity);

	const now = Date.now() + (30 * 60 * 1000);
	activities.forEach((activity) => {
		if (activity.time.getTime() <= now) {
			return;
		}

		// Add reminder
		const reminderTime = activity.time.getTime() - now;
		setTimeout(() => {
			remind(activity.id);
		}, reminderTime);
	});
})();


const reminder = {
	async scheduleReminder(activityId) {
		const activity = transforms.transformActivity(await ActivityModel.getActivityById(activityId));

		// Add reminder
		const now = Date.now() + (30 * 60 * 1000);
		const reminderTime = activity.time.getTime() - now;
		setTimeout(() => {
			remind(activity.id);
		}, reminderTime);
	},
};

module.exports = reminder;
