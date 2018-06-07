const Member = require('../../models/MemberModel');
const TeamModel = require('../../models/TeamModel');
const NotificationModel = require('../../models/NotificationModel');
const transforms = require('../transforms');

const MemberController = {

	/**
	 * Returns all members of a team.
	 * @param {Request} req Request object
	 * @param {Response} res Response object
	 */
	async getMemberOfTeam(req, res) {
		const { userId } = req.token;
		const { teamId } = req.params;

		const isMember = await Member.isMember(teamId, userId);

		if (isMember) {
			const member = await Member.getMemberOfTeam(teamId);

			res.json(member.map(transforms(userId).transformUser));
		} else {
			res.status(404).json({
				message: 'Invalid team id.',
			});
		}
	},

	/**
	 * Adds a new member to a team.
	 * @param {Request} req Request object.
	 * @param {Response} res Response object.
	 */
	async addMember(req, res) {
		const { userId } = req.token;
		const { teamId } = req.params;
		const memberId = req.params.userId;

		if (!memberId || !teamId) {
			res.status(400).json({
				message: 'Invalid team id or user id.',
			});
			return;
		}

		const isTeamManager = await TeamModel.isTeammanager(userId, teamId);

		if (!isTeamManager) {
			res.status(403).json({
				message: 'Only the creator of a group can add members.',
			});
		} else {
			await Member.addMember(memberId, teamId, userId === memberId);

			// Send invitation to user
			const team = await TeamModel.getTeamById(teamId);
			if (userId !== memberId) {
				NotificationModel.addNotification(memberId, 'joinTeam', 'Team invitation', `You are invited to join the team '${team.Teamname}'.`, teamId)
					.catch(() => {});
			}

			// Send notification to other team members
			if (userId === memberId) {
				NotificationModel.notifyTeam(teamId, 'notification', 'New team member', `A new member joined your team '${team.Teamname}'.`, teamId, memberId)
					.catch(() => {});
			}

			// Send response to client
			res.status(201).json({
				message: 'Member added to team.',
			});
		}
	},

	/**
	 * Deletes a member of a team.
	 * @param {Request} req Request object.
	 * @param {Response} res Response object.
	 */
	async deleteMember(req, res) {
		const { userId } = req.token;
		const { teamId } = req.params;
		const memberId = req.params.userId;

		if (!teamId || !memberId) {
			res.status(400).json({
				success: false,
				message: 'Invalid team or user id.',
			});
			return;
		}

		// TODO: Check if teammanager leaves => new team manager
		const isMember = await Member.isMember(teamId, memberId);
		const isTeamManager = await TeamModel.isTeammanager(userId, teamId);

		if ((isTeamManager) || (Number(userId) === Number(memberId) && isMember)) {
			const response = await Member.deleteMember(teamId, memberId);

			// Send notification to other team members
			const team = await TeamModel.getTeamById(teamId);
			NotificationModel.notifyTeam(teamId, 'notification', 'Team member left', `A member left your team '${team.Teamname}'.`, teamId, null)
				.catch(() => {});

			if (response.affectedRows === 1) {
				res.json({
					success: true,
					message: 'Member deleted.',
				});
			} else {
				res.status(404).json({
					success: false,
					message: 'Invalid team or user id.',
				});
			}
		} else {
			res.status(403).json({
				success: false,
				message: 'Invalid team or user id.',
			});
		}
	},

};

module.exports = MemberController;
