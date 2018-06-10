const OrganizationModel = require('../../models/OrganizationModel');
const transforms = require('../transforms');
const { validOrganization } = require('./organizationValidation');

const OrganizationController = {

	async getAllOrganizations(req, res) {
		const { userId } = req.token;

		const organizations = await OrganizationModel.getAllOrganizations();

		res.json(organizations.map(transforms(userId).transformOrganization));
	},

	async getOrganizationById(req, res) {
		const { userId } = req.token;
		const { organizationId } = req.params;

		const organization = await OrganizationModel.getOrganizationById(organizationId);

		if (!organization) {
			res.status(404).json({
				message: 'Invalid organization id.',
			});
		} else {
			res.json(transforms(userId).transformOrganization(organization));
		}
	},

	async addOrganization(req, res) {
		const { userId } = req.token;
		const organization = req.body;

		if (!validOrganization(organization)) {
			res.status(400).json({
				message: 'Invalid organization data.',
			});
			return;
		}

		const result = await OrganizationModel.addOrganization(userId, organization);

		res.json({
			organizationId: result.insertId,
		});
	},

	async deleteOrganization(req, res) {
		const { userId } = req.token;
		const { organizationId } = req.params;

		const organization = await OrganizationModel.getOrganizationById(organizationId);
		if (!organization) {
			res.status(404).json({
				success: false,
				message: 'Organization not found.',
			});
			return;
		}
		if (organization.User_Id !== userId) {
			res.status(403).json({
				success: false,
				message: 'Permission denied.',
			});
		}

		await OrganizationModel.deleteOrganization(organizationId);
		res.json({
			success: true,
			message: 'Organization deleted.',
		});
	},

	async updateOrganization(req, res) {
		const { userId } = req.token;
		const { organizationId } = req.params;
		const newOrganization = req.body;

		if (!validOrganization(newOrganization)) {
			res.status(400).json({
				success: false,
				message: 'Invalid organization data.',
			});
		}

		const organization = await OrganizationModel.getOrganizationById(organizationId);
		if (!organization) {
			res.status(404).json({
				success: false,
				message: 'Organization not found.',
			});
			return;
		}
		if (organization.User_Id !== userId) {
			res.status(403).json({
				success: false,
				message: 'Permission denied.',
			});
		}

		await OrganizationModel.updateOrganization(organizationId, newOrganization);
		res.json({
			success: true,
			message: 'Organization edited.',
		});
	},

};

module.exports = OrganizationController;
