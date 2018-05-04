const Member = require('../models/MemberModel');
const TeamModel = require('../models/TeamModel');
const User = require('../models/User');

const MemberController = {

	async getMemberOfTeam(req, res) {
		const { userId } = req.token;
		const { teamId } = req.params;

		try {
			const isMember = Member.isMember(teamId, userId);
			const memberOfTeam = Member.getMemberOfTeam(teamId);

			if (await isMember) {
				const member = await memberOfTeam;

				res.json(member.map(user => (new User(User.fromDBUser(user)).getUserWithoutPassword())));
			} else {
				res.status(404).json({
					message: 'Invalid team id.',
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

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
			const teammanager = await TeamModel.getTeammanager(teamId);

			if (teammanager.length !== 1 || !teammanager[0] || teammanager[0].User_Id !== userId) {
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
			const isMember = Member.isMember(teamId, memberId);
			const managerRows = await TeamModel.getTeammanager(teamId);

			const manager = managerRows[0];

			if (!!manager || (await isMember && Number(userId) === Number(memberId))) {
				await Member.deleteMember(teamId, memberId);

				res.json({
					message: 'Member deleted.',
				});
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
