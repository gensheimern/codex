class User {
	constructor(user) {
		this.nameTransition = {
			id: 'User_Id',
			name: 'Name',
			firstName: 'Firstname',
			email: 'Email',
			password: 'Password',
			image: 'Image',
		};

		this.data = {
			...user,
		};
	}

	createDBUser() {
		const dbUser = {};

		Object.keys(this.data).forEach((key) => {
			dbUser[this.nameTransition[key]] = this.data.key;
		});

		return dbUser;
	}

	getUser() {
		return { ...this.data };
	}

	getUserWithoutPassword() {
		const user = { ...this.data };
		delete user.password;

		return user;
	}

	static fromDBUser(dbUser = {}) {
		return {
			id: dbUser.User_Id,
			firstName: dbUser.Firstname,
			name: dbUser.Name,
			email: dbUser.Email,
			password: dbUser.Password,
			image: dbUser.Image,
		};
	}
}

module.exports = User;
