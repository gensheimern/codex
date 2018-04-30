const Team = require('../models/TeamModel');

TeamController = {

	async getAllTeams(req, res) {
		const userID = req.token.User_Id;

		try {
			let teams = await Team.getAllTeams(userID);

			res.json(teams.map(team => {
				return {
					id: team.Team_Id,
					name: team.Teamname,
					managerName: team.Name,
					managerFirstName: team.Firstname
				}
			}));
		}
		catch(error) {
			res.sendStatus(500);
		}
	},

	async getTeamById(req, res) {
		const userID = req.token.User_Id;

		try {
			let teams = await Team.getTeamById(req.params.id, userID);

			if(teams.length === 0) {
				res.status(404).json({
					message: `Team with ID ${req.params.id} not found.`
				});
			}
			else {
				res.json(teams[0]);
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async addTeam(req, res) {
		const userID = req.token.User_Id;

		if(!req.body.Teamname) {
			res.status(400).json({
				message: "Invalid team name"
			});
		}

		try {
			let dbRes = await Team.addTeam(req.body.Teamname, userID);

			res.status(201).json({
				Team_Id: dbRes.insertId,
				Teamname: req.body.Teamname,
				Teammanager: userID
			});
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async deleteTeam(req, res) {
		const userID = req.token.User_Id;

		try {
			let dbRes = await Team.deleteTeam(req.params.id, userID);

			if(dbRes.affectedRows === 0) {
				res.status(404).json({
					message: `Team with ID ${req.params.id} not found.`
				});
			}
			else {
				res.status(200).json({
					message: "Team deleted."
				});
			}
		} catch (error) {console.error(error);
			res.sendStatus(500);
		}
	},

	async updateTeam(req, res) {
		const userID = req.token.User_Id;
		if(!req.body.Teamname) {
			res.status(400).json({
				message: "Invalid new team name."
			});
		}

		try {
			let dbRes = await Team.updateTeam(req.params.id, req.body.Teamname, userID);

			if(dbRes.affectedRows === 0) {
				res.status(404).json({
					message: `Team with ID ${req.params.id} not found.`
				});
			}
			else {
				res.status(200).json({
					message: "Team information updated."
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	}

}

module.exports = TeamController;