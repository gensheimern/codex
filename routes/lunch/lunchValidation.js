const lunchValidation = {
	validLunch(lunch) {
		if (!lunch) return false;

		return lunchValidation.validPrice(lunch.price)
			&& lunchValidation.validText(lunch.lunchText)
			&& lunchValidation.validTime(lunch.time);
	},

	validPrice(price) {
		// TODO: Check for valid characters
		return typeof price === 'string'
			&& price.length > 0;
	},

	validText(text) {
		return typeof text === 'string';
	},


	validTime(time) {
		// TODO: Check time format 2018-04-20 12:34:18
		return typeof time === 'string';
		//	&& /\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d/.test(time); // TODO: Schöner machen
	},

};

module.exports = lunchValidation;
