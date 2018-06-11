const organizationValidation = {
	validOrganization(organization) {
		return organization
			&& organizationValidation.validName(organization.name)
			&& organizationValidation.validDescription(organization.description)
			&& organizationValidation.validPassword(organization.password);
	},

	validName(name) {
		return typeof name === 'string'
			&& name.length > 0;
	},

	validDescription(description) {
		return typeof description === 'string';
	},

	validPassword(password) {
		return typeof password === 'string';
	},
};

module.exports = organizationValidation;
