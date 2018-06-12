const databaseConnection = require('./DatabaseConnection');
const Auth = require('../routes/auth/Auth');

const OrganizationModel = {

	async getAllOrganizations() {
		return databaseConnection.queryp(`
			SELECT Organization.*, User.* 
			FROM Organization 
			INNER JOIN User 
				ON User.User_Id = Organization.Admin`);
	},

	async getOrganizationById(organizationId) {
		return databaseConnection.querypFirst('SELECT Organization.*, User.* FROM Organization INNER JOIN User ON User.User_Id = Organization.Admin WHERE Organization_Id = ?', [organizationId]);
	},

	async addOrganization(adminId, organization) {
		const { name, password, description } = organization;
		return databaseConnection.queryp('INSERT INTO Organization (Organizationname, Description, Organizationpassword, Admin) VALUES (?, ?, ?, ?)', [name, description, await Auth.hashPassword(password), adminId]);
	},

	async updateOrganization(organizationId, organization) {
		const { name, password, description } = organization;
		return databaseConnection.queryp('UPDATE Organization SET Organizationname = ?, Description = ?, Organizatinopassword = ? WHERE Organization_Id = ?', [name, description, await Auth.hashPassword(password), organizationId]);
	},

	async deleteOrganization(organizationId) {
		return databaseConnection.queryp('DELETE FROM Organization WHERE Organization_Id = ?', [organizationId]);
	},

	async isAdmin(userId, organizationId) {
		return databaseConnection.querypBool('SELECT Organization_Id FROM Organization WHERE Organization_Id = ? AND User_Id = ?', [organizationId, userId]);
	},

	async changeAdmin(userId, organizationId) {
		return databaseConnection.queryp('UPDATE Organization SET Admin = ? WHERE Organization_Id = ?', [userId, organizationId]);
	},

};


module.exports = OrganizationModel;