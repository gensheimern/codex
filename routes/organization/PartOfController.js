const PartOfModel = require('../../models/PartOfModel');
const OrganizationModel = require('../../models/OrganizationModel');
const transforms = require('../transforms');

const PartOfController = {

	async getAllMembers(req, res) {
		const { userId } = req.token;
		const { organizationId } = req.params;

		const isMember = await PartOfModel.isPartOf(userId, organizationId);
		const isAdmin = await OrganizationModel.isAdmin(userId, organizationId);
		if (!isMember && !isAdmin) {
			res.status(403).json({
				message: 'Only member of the organization can see the members.',
			});
			return;
		}

		const members = await PartOfModel.getAllMembers();

		res.json(members.map(transforms(userId).transformUser));
	},

	async getOrganizationsOfUser(req, res) {
		const { userId } = req.token;

		const organizations = await PartOfModel.getOrganizationsOfUser(userId);

		res.json(organizations.map(transforms(userId).transformOrganization));
	},

	async getActiveOrganizationsOfUser(req, res) {
		const { userId } = req.token;

		const organizations = await PartOfModel.getActiveOrganizationsOfUser(userId);

		res.json(organizations.map(transforms(userId).transformOrganization));
	},

	async addMember(req, res) {
		const { userId } = req.token;
		const { organizationId } = req.params;
		const targetId = req.params.userId;

		if (!await OrganizationModel.isAdmin(userId, organizationId)) {
			res.status(403).json({
				success: false,
				message: 'Only the admin can add other members.',
			});
			return;
		}

		const result = await PartOfModel.addMemberOfOrganization(targetId, organizationId);

		if (result.affectedRows !== 1) {
			res.status(404).json({
				success: false,
				message: 'Organization not found.',
			});
		} else {
			res.json({
				success: true,
				message: 'Successfully added member to organization.',
			});
		}
	},

	async deleteMember(req, res) {
		const { userId } = req.token;
		const { organizationId } = req.params;
		const targetId = req.params.userId;

		if (!await OrganizationModel.isAdmin(userId)) {
			res.status(403).json({
				success: false,
				message: 'Only the admin can add other members.',
			});
			return;
		}

		const result = await PartOfModel.deleteMemberOfOrganization(targetId, organizationId);

		if (result.affectedRows !== 1) {
			res.status(404).json({
				success: false,
				message: 'Organization not found.',
			});
		} else {
			res.json({
				success: true,
				message: 'Successfully removed member from organization.',
			});
		}
	},

	async joinOrganization(req, res) {
		const { userId } = req.token;
		const { organizationId } = req.params;

		const result = await PartOfModel.addMemberOfOrganization();
		await PartOfModel.setActiveOrganization(userId, organizationId);

		if (result.affectedRows !== 1) {
			res.status(404).json({
				success: false,
				message: 'Organization not found.',
			});
		} else {
			res.json({
				success: true,
				message: 'Successfully joined organization.',
			});
		}
	},

	async leaveOrganization(req, res) {
		const { userId } = req.token;
		const { organizationId } = req.params;

		const result = await PartOfModel.deleteMemberOfOrganization(userId, organizationId);

		if (result.affectedRows !== 1) {
			res.status(404).json({
				success: false,
				message: 'Organization not found.',
			});
		} else {
			res.json({
				success: true,
				message: 'Successfully left organization.',
			});
		}
	},

};

module.exports = PartOfController;
