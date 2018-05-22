const userValidation = {
	emailRegExp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

	validUser(user) {
		const {
			firstName, name, password, email, image,
		} = user;

		return this.validEmail(email)
			&& this.validName(firstName)
			&& this.validName(name)
			&& this.validPassword(password)
			&& this.validImage(image);
	},

	validEmail(email) {
		return !!email
			&& typeof email === 'string'
			&& email.length > 0
			&& this.emailRegExp.test(email);
	},

	validName(name) {
		return !!name
			&& typeof name === 'string'
			&& name.length > 0;
	},

	validPassword(password) {
		// TODO: Check for valid characters

		return !!password
			&& typeof password === 'string'
			&& password.length > 0;
	},

	validImage(imagePath) {
		return !!imagePath
			&& typeof imagePath === 'string';
	},
};

module.exports = userValidation;
