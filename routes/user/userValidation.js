const userValidation = {
	emailRegExp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

	validUser(user) {
		if (!user) return false;

		const {
			firstName, name, password, email, image,
		} = user;

		return userValidation.validEmail(email)
			&& userValidation.validName(firstName)
			&& userValidation.validName(name)
			&& userValidation.validPassword(password)
			&& userValidation.validImage(image);
	},

	validEmail(email) {
		return !!email
			&& typeof email === 'string'
			&& email.length > 0
			&& userValidation.emailRegExp.test(email);
	},

	validName(name) {
		// TODO: Check for valid characters
		// TODO: Check for length
		return typeof name === 'string'
			&& name.length > 0;
	},

	validPassword(password) {
		// TODO: Check for valid characters
		// TODO: Check for length

		return typeof password === 'string'
			&& password.length > 0;
	},

	validImage(imagePath) {
		// TODO: Check for valid path
		return typeof imagePath === 'string';
	},
};

module.exports = userValidation;
