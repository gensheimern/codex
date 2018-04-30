const Member = require('../models/MemberModel');

MemberController = {
	
	async getMemberOfTeam(req, res) {
		const userID = req.token.User_Id;
		const teamID = req.params.id;

		try {
			let isMember = await Member.isMember(teamID, userID);

			if(isMember) {
				let member = await Member.getMemberOfTeam(teamID);

				res.json(member);
			}
			else {
				res.status(400).json({
					message: "Invalid team id."
				});
			}
		} catch (error) {console.error(error);
			res.sendStatus(500);
		}
	},

	async addMember(req, res) {
		const userID = req.token.User_Id;
		const memberID = req.body.User_Id;
		const teamID = req.body.Team_Id;

		if(!memberID || !teamID) {
			res.status(400).json({
				message: "Invalid team or user id."
			});
		}

		try {
			let teammanager = await TeamModel.getTeammanager(teamID);

			if(teammanager !== userID) {
				res.status(403).json({
					message: "Only the creator of a group can add members."
				});
			}
			else {
				await Member.addMember(memberID, teamID);
				res.json({
					message: "Member added to team."
				});
			}
		} catch (error) {
			reject(error);
		}
	},

	async deleteMember(req, res) {
		const userID = req.token.User_Id;
		const teamID = req.body.Team_Id;

		if(!teamID) {
			res.status(400).json({
				message: "Invalid team or user id."
			});
		}

		try {
			let isMember = await Member.isMember(teamID, userID);

			if(!isMember) {
				res.status(403).json({
					message: "Invalid team or user id."
				});
			}
			else {
				await Member.deleteMember(teamID, userID);
				res.json({
					message: "Member deleted."
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	}

}

module.exports = MemberController;