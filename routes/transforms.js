const transforms = {
	transformUser: dbUser => ({
		id: dbUser.User_Id,
		firstName: dbUser.Firstname,
		name: dbUser.Name,
		email: dbUser.Email,
		image: dbUser.Image,
	}),

	transformTeam: dbTeam => ({
		id: dbTeam.Team_Id,
		name: dbTeam.Teamname,
		manager: {
			...transforms.transformUser(dbTeam),
		},
	}),

	transformActivity: dbActivity => ({
		id: dbActivity.Activity_Id,
		description: dbActivity.Description,
		name: dbActivity.Activityname,
		place: dbActivity.Place,
		time: dbActivity.Time,
		event: Boolean(dbActivity.Eventtag),
		private: Boolean(dbActivity.Private),
		banner: dbActivity.Banner,
		maxParticipants: dbActivity.MaxParticipants,
		host: {
			...transforms.transformUser(dbActivity),
		},
	}),

	transformMessage: dbMessage => ({
		id: dbMessage.Message_Id,
		time: new Date(dbMessage.Date.getTime() - (new Date().getTimezoneOffset() * 2 * 60 * 1000)),
		content: dbMessage.Messagecontent,
		author: {
			...transforms.transformUser(dbMessage),
		},
	}),

	transformNotification: dbNotification => ({
		id: dbNotification.Notification_Id,
		type: dbNotification.Type,
		title: dbNotification.Title,
		message: dbNotification.Message,
		time: dbNotification.Time,
		seen: Boolean(dbNotification.Seen),
		target: dbNotification.Target_Id,
		user: {
			...transforms.transformUser(dbNotification),
		},
	}),
};

module.exports = transforms;
