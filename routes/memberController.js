const Member = require('../models/MemberModel');
const TeamModel = require('../models/TeamModel');
// const User = require('../models/User');
const transforms = require('./transforms');

const MemberController = {

	/**
	 * Returns all members of a team.
	 * @param {Request} req Request object
	 * @param {Response} res Response object
	 */
	async getMemberOfTeam(req, res) {
		const { userId } = req.token;
		const { teamId } = req.params;

		try {
			const isMember = Member.isMember(teamId, userId);
			const memberOfTeam = Member.getMemberOfTeam(teamId);

			if (await isMember) {
				const member = await memberOfTeam;

				res.json(member.map(transforms.transformUser));
			} else {
				res.status(404).json({
					message: 'Invalid team id.',
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

	/**
	 * Adds a new member to a team.
	 * @param {Request} req Request object.
	 * @param {Response} res Response object.
	 */
	async addMember(req, res) {
		const { userId } = req.token;
		const { teamId, memberId } = req.params;

		if (!memberId || !teamId) {
			res.status(400).json({
				message: 'Invalid team id or user id.',
			});
			return;
		}

		try {
			const isTeamManager = await TeamModel.isTeammanager(userId, teamId);

			if (!isTeamManager) {
				res.status(403).json({
					message: 'Only the creator of a group can add members.',
				});
			} else {
				await Member.addMember(memberId, teamId);

				res.status(201).json({
					message: 'Member added to team.',
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

	/**
	 * Deletes a member of a team.
	 * @param {Request} req Request object.
	 * @param {Response} res Response object.
	 */
	async deleteMember(req, res) {
		const { userId } = req.token;
		const { memberId, teamId } = req.params;

		if (!teamId || !memberId) {
			res.status(400).json({
				message: 'Invalid team or user id.',
			});
			return;
		}

		try {
			// TODO: Check if teammanager leaves => new team manager
			const isMember = Member.isMember(teamId, memberId);
			const isTeamManager = TeamModel.isTeammanager(userId, teamId);

			if ((await isTeamManager) || (Number(userId) === Number(memberId) && await isMember)) {
				const response = await Member.deleteMember(teamId, memberId);

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
					message: 'Invalid team or user id.',
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

};

module.exports = MemberController;
