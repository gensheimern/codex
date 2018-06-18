const databaseConnection = require('./DatabaseConnection');

const PartOfModel = {

	async getAllMembers() {
		return databaseConnection.queryp('SELECT User.* FROM part_of INNER JOIN User on part_of.User_Id = User.User_Id WHERE part_of.Active = 1');
	},

	async getOrganizationsOfUser(userId) {
		return databaseConnection.queryp(`
			SELECT Organization.*, User.*
			FROM Organization
			INNER JOIN User
				ON User.User_Id = Organization.Administrator
			INNER JOIN part_of
				ON part_of.Organization_Id = Organization.Organization_Id
			WHERE part_of.User_Id = ?
		`, [userId]);
	},

	async getActiveOrganizationsOfUser(userId) {
		return databaseConnection.queryp(`
			SELECT Organization.*, User.*
			FROM Organization
			INNER JOIN User
				ON User.User_Id = Organization.Administrator
			INNER JOIN part_of
				ON part_of.Organization_Id = Organization.Organization_Id
			WHERE part_of.User_Id = ?
			AND part_of.Active = 1
		`, [userId]);
	},

	async addMemberOfOrganization(userId, organizationId) {
		return databaseConnection.queryp('INSERT INTO part_of (User_Id, Organization_Id, Active) VALUES (?, ?, 0)', [userId, organizationId]);
	},

	async deleteMemberOfOrganization(userId, organizationId) {
		return databaseConnection.queryp('DELETE FROM part_of WHERE User_Id = ? AND Organization_Id = ?', [userId, organizationId]);
	},

	async setActiveOrganization(userId, organizationId) {
		await databaseConnection.queryp('UPDATE part_of SET Active = 0 WHERE User_Id = ?', [userId]);
		await databaseConnection.queryp('UPDATE part_of SET Active = 1 WHERE User_Id = ? AND Organization_Id = ?', [userId, organizationId]);
	},

	async isPartOf(userId, organizationId) {
		return databaseConnection.querypBool('SELECT User_Id FROM part_of WHERE User_Id = ? AND Organization_Id = ?', [userId, organizationId]);
	},

};


module.exports = PartOfModel;
