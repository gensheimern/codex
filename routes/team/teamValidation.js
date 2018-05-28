const teamValidation = {
	validTeam(name) {
		// TODO: Check for valid characters
		return !!name
			&& typeof name === 'string'
			&& name.length > 0;
	},
};

module.exports = teamValidation;
