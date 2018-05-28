const chai = require('chai');

const { expect } = chai;
const userValidation = require('../routes/user/userValidation');


describe('User validation', () => {
	describe('validate user', () => {
		it('should accept valid user', () => {
			const user = {
				firstName: 'Max',
				name: 'Mustermann',
				email: 'valid@email.com',
				password: 'a/sg63(§7v',
				image: 'image.png',
			};
			const result = userValidation.validUser(user);
			expect(result, 'Correct validation').to.be.true;
		});

		it('should reject no value', () => {
			const result = userValidation.validUser();
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong first name', () => {
			const user = {
				firstName: '',
				name: 'Mustermann',
				email: 'valid@email.com',
				password: 'a/sg63(§7v',
				image: 'image.png',
			};
			const result = userValidation.validUser(user);
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong  name', () => {
			const user = {
				firstName: 'Max',
				name: '',
				email: 'valid@email.com',
				password: 'a/sg63(§7v',
				image: 'image.png',
			};
			const result = userValidation.validUser(user);
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong email', () => {
			const user = {
				firstName: 'Max',
				name: 'Mustermann',
				email: 'invalidemail.com',
				password: 'a/sg63(§7v',
				image: 'image.png',
			};
			const result = userValidation.validUser(user);
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong password', () => {
			const user = {
				firstName: 'Max',
				name: 'Mustermann',
				email: 'valid@email.com',
				password: '',
				image: 'image.png',
			};
			const result = userValidation.validUser(user);
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong image path', () => {
			const user = {
				firstName: 'Max',
				name: 'Mustermann',
				email: 'valid@email.com',
				password: 'a/sg63(§7v',
				image: null,
			};
			const result = userValidation.validUser(user);
			expect(result, 'Correct validation').to.be.false;
		});
	});

	describe('validate email', () => {
		it('should accept valid email', () => {
			const result = userValidation.validEmail('valid@email.com');
			expect(result, 'Correct validation').to.be.true;
		});

		it('should reject no value', () => {
			const result = userValidation.validEmail();
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong type', () => {
			const result = userValidation.validEmail(123);
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject empty email', () => {
			const result = userValidation.validEmail('');
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong email', () => {
			const result1 = userValidation.validEmail('invalidemail.com');
			expect(result1, 'Correct validation').to.be.false;

			const result2 = userValidation.validEmail('invalid@emailcom');
			expect(result2, 'Correct validation').to.be.false;
		});
	});

	describe('validate name', () => {
		it('should accept valid name', () => {
			const result = userValidation.validName('Max');
			expect(result, 'Correct validation').to.be.true;
		});

		it('should reject no value', () => {
			const result = userValidation.validName();
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong type', () => {
			const result = userValidation.validName(123);
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject too short', () => {
			const result = userValidation.validName('');
			expect(result, 'Correct validation').to.be.false;
		});

		/* it('should reject too long', () => {
			const result = userValidation.validName('ToooooooooooooooooooooooooooooooooooooooooLongName');
			expect(result, 'Correct validation').to.be.false;
		}); */
	});

	describe('validate password', () => {
		it('should accept valid password', () => {
			const result = userValidation.validPassword('a/sg63(§7v');
			expect(result, 'Correct validation').to.be.true;
		});

		it('should reject no value', () => {
			const result = userValidation.validPassword();
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong type', () => {
			const result = userValidation.validPassword();
			expect(result, 'Correct validation').to.be.false;
		});
	});

	describe('validate image path', () => {
		it('should accept valid password', () => {
			const result = userValidation.validImage('a/sg63(§7v');
			expect(result, 'Correct validation').to.be.true;
		});

		it('should reject no value', () => {
			const result = userValidation.validImage();
			expect(result, 'Empty path').to.be.false;
		});

		it('should reject wrong type', () => {
			const result = userValidation.validImage(123);
			expect(result, 'Wrong type').to.be.false;
		});
	});
});
