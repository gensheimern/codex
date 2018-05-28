const chai = require('chai');
const Auth = require('../routes/auth/Auth');
const TestTools = require('./TestTools');
const sinon = require('sinon');
const config = require('../config');

const { expect } = chai;

const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6Ik1heCIsIm5hbWUiOiJNdXN0ZXJtYW5uIiwiZW1haWwiOiJ2YWxpZEBlbWFpbC5kZSIsImlhdCI6MTUyNTY0MjQ5MiwiZXhwIjoxNTI1NzI4ODkyfQ.Bg6wgDP_e4K_nFTfUDg46eqzTGv1e7PNLilVNTEU39Q';

describe('Auth', () => {
	describe('Hash password and validate it', () => {
		it('should hash password', async () => {
			const hash = await Auth.hashPassword('password');
			const valid = Auth.validateHash('password', hash);
			const invalid = Auth.validateHash('incorrect', hash);

			expect(await valid).to.be.true;
			expect(await invalid).to.be.false;
		});
	});

	describe('JSON web token', () => {
		it('should create a JWT', async () => Auth.createJWT({ message: 'Test', iat: 12345, exp: 678910 }));

		it('should not create a JWT with invalid payload', async () => {
			// mock jwt secret
			const oldSecret = config.JWT_SECRET;
			config.JWT_SECRET = null;
			try {
				await Auth.createJWT({ message: 'Test', iat: 12345, exp: 678910 });
			} catch (error) {
				expect(error).to.be.an.instanceof(Error);
			} finally {
				config.JWT_SECRET = oldSecret;
			}
		});

		it('should fail on expired JWT', async () => {
			try {
				await Auth.validateJWT(expiredToken);
			} catch (error) {
				expect(error).to.be.an.instanceOf(Error);
			}
		});

		it('should validate a JWT', async () => {
			const token = await Auth.createJWT({ message: 'Test' });

			const payload = await Auth.validateJWT(token);

			expect(payload.message).to.equal('Test', 'Correct payload');
		});
	});

	describe('verify middleware', () => {
		it('should return if no token provided', async () => {
			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				headers: {
				},
			}, false);
			const next = sinon.spy();

			// Call test method
			await Auth.verifyMiddleware(req, res, next);

			expect(res._getStatusCode(), 'Right status code').to.equal(401);
			expect(req.token).to.be.undefined;
			expect(next.called).to.be.false;
		});

		it('should return if invalid token provided', async () => {
			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				headers: {
					'x-access-token': expiredToken,
				},
			}, false);
			const next = sinon.spy();

			// Call test method
			await Auth.verifyMiddleware(req, res, next);

			expect(res._getStatusCode(), 'Right status code').to.equal(401);
			expect(req.token).to.be.undefined;
			expect(next.called).to.be.false;
		});

		it('should call next with valid token', async () => {
			const token = await Auth.createJWT(TestTools.token);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				headers: {
					'x-access-token': token,
				},
			}, false);
			const next = sinon.spy();

			// Call test method
			await Auth.verifyMiddleware(req, res, next);

			expect(res._getStatusCode(), 'Right status code').to.equal(200);
			expect(req.token.userId).to.equal(TestTools.token.userId);
			expect(req.token.firstName).to.equal(TestTools.token.firstName);
			expect(req.token.name).to.equal(TestTools.token.name);
			expect(req.token.email).to.equal(TestTools.token.email);
			expect(next.called).to.be.true;
		});
	});
});
