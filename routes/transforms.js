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
		event: dbActivity.Eventtag === 1,
		private: dbActivity.Private === 1,
		banner: dbActivity.Banner,
		maxParticipants: dbActivity.MaxParticipants,
		host: {
			...transforms.transformUser(dbActivity),
		},
	}),

	transformMessage: dbMessage => ({
		id: dbMessage.Message_Id,
		time: dbMessage.Date,
		content: dbMessage.Messagecontent,
		author: {
			...transforms.transformUser(dbMessage),
		},
	}),
};

module.exports = transforms;
