const activityValidation = {
	validActivity(activity) {
		console.log(activity);
		if (!activity) return false;

		return activityValidation.validName(activity.name)
			&& activityValidation.validDescription(activity.description)
			&& activityValidation.validPlace(activity.place)
			&& activityValidation.validTime(activity.time)
			&& activityValidation.validEventTag(activity.event)
			&& activityValidation.validPrivateTag(activity.private)
			&& activityValidation.validBanner(activity.banner)
			&& activityValidation.validMaxParticipants(activity.maxParticipants);
	},

	validName(name) {
		// TODO: Check for valid characters
		return typeof name === 'string'
			&& name.length > 0;
	},

	validDescription(description) {
		return typeof description === 'string';
	},

	validPlace(place) {
		return typeof place === 'string'
			&& place.length > 0;
	},

	validTime(time) {
		// TODO: Check time format 2018-04-20 12:34:18
	 	return typeof time === 'string'
		//	&& /\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d/.test(time); // TODO: Schöner machen
	},

	validEventTag(eventTag) {
		return typeof eventTag === 'boolean';
	},

	validPrivateTag(privateTag) {
		return typeof privateTag === 'boolean';
	},

	validBanner(banner) {
		// TODO: Check for valid path format
		return typeof banner === 'string';
	},

	validMaxParticipants(maxParticipants) {
		// TODO: set upper limit
		return typeof maxParticipants === 'number'
			&& maxParticipants >= 0;
	},
};

module.exports = activityValidation;
