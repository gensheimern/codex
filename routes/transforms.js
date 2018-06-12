const transforms = (userId) => {
	const transformUser = dbUser => ({
		id: dbUser.User_Id,
		firstName: dbUser.Firstname,
		name: dbUser.Name,
		email: dbUser.Email,
		image: dbUser.Image,
		me: dbUser.User_Id === userId,
	});

	const transformTeam = dbTeam => ({
		id: dbTeam.Team_Id,
		name: dbTeam.Teamname,
		icon: dbTeam.Team_Icon,
		description: dbTeam.Description,
		manager: {
			...transformUser(dbTeam),
		},
	});

	const transformActivity = dbActivity => ({
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
			...transformUser(dbActivity),
		},
	});

	const transformMessage = dbMessage => ({
		id: dbMessage.Message_Id,
		time: new Date(dbMessage.Date.getTime() - (new Date().getTimezoneOffset() * 2 * 60 * 1000)),
		content: dbMessage.Messagecontent,
		author: {
			...transformUser(dbMessage),
		},
	});

	const transformNotification = dbNotification => ({
		id: dbNotification.Notification_Id,
		type: dbNotification.Type,
		title: dbNotification.Title,
		message: dbNotification.Message,
		time: dbNotification.Time,
		seen: Boolean(dbNotification.Seen),
		targetId: dbNotification.Target_Id,
		user: {
			...transformUser(dbNotification),
		},
	});

	const transformOrganization = dbOrganization => ({
		id: dbOrganization.Organization_Id,
		name: dbOrganization.Organizationname,
		description: dbOrganization.Description,
		admin: {
			...transformUser(dbOrganization),
		},
	});

	return {
		transformUser,
		transformTeam,
		transformActivity,
		transformMessage,
		transformNotification,
		transformOrganization,
	};
};

module.exports = transforms;
