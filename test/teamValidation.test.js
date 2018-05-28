const chai = require('chai');

const { expect } = chai;
const teamValidation = require('../routes/team/teamValidation');


describe('Team validation', () => {
	describe('validate team', () => {
		it('should accept valid team', () => {
			const team = 'Grillmasters';
			const result = teamValidation.validTeam(team);
			expect(result, 'Correct validation').to.be.true;
		});

		it('should reject no value', () => {
			const result = teamValidation.validTeam();
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject invalid teamname', () => {
			const result = teamValidation.validTeam('');
			expect(result, 'Correct validation').to.be.false;
		});
	});
});
