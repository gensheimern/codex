module.exports = {
	DB_HOST: process.env.DB_HOST || '159.65.115.221',
	DB_USER: process.env.DB_USER || 'root',
	DB_PASS: process.env.DB_PASS || 'teamcodex',
	DB_NAME: process.env.DB_NAME || 'lunch_planner',
	JWT_SECRET: process.env.JWT_SECRET || 'secret',
	MAIL_HOST: process.env.MAIL_HOST || '159.65.115.221',
	MAIL_USER: process.env.MAIL_USER || 'support@codex-team.de',
	MAIL_PASS: process.env.MAIL_PASS || 'teamcodex123',
};
