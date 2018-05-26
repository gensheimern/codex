const testData = {
	allUsers: [{
		id: 1,
		firstName: 'Max',
		name: 'Mustermann',
		email: 'valid@email.com',
		image: '/image.png',
	},
	{
		id: 2,
		firstName: 'Max2',
		name: 'Mustermann2',
		email: 'valid2@email.com',
		image: '/image2.png',
	}],

	userData: {
		id: 5,
		firstName: 'Max',
		name: 'Mustermann',
		email: 'valid@email.com',
		image: '/image.png',
	},

	postUserData: {
		firstName: 'Max',
		name: 'Mustermann',
		email: 'valid@email.com',
		password: 'very_secure_password',
		image: '/image.png',
	},

	newUserData: {
		firstName: 'Maxneu',
		name: 'Mustermannneu',
		email: 'neue@email.com',
		password: 'very_new_password',
		image: '/new_image.png',
	},
};

const dbTestData = {
	allUsers: [{
		User_Id: 1,
		Firstname: 'Max',
		Name: 'Mustermann',
		Email: 'valid@email.com',
		Password: '1234',
		Image: '/image.png',
	},
	{
		User_Id: 2,
		Firstname: 'Max2',
		Name: 'Mustermann2',
		Email: 'valid2@email.com',
		Password: '5678',
		Image: '/image2.png',
	},
	],

	userData: {
		User_Id: 5,
		Firstname: 'Max',
		Name: 'Mustermann',
		Email: 'valid@email.com',
		Image: '/image.png',
	},
};

module.exports = {
	dbTestData,
	testData,
};
