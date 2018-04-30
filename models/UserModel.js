const databaseConnection = require('./DatabaseConnection');
const encryptPassword = require('../routes/auth/CryptPassword');

const User = {

	async getAllUsers() {
		return databaseConnection.queryp("SELECT User_Id, Firstname, Name, Email FROM User");
	},

	async getUserById(userID) {
		return databaseConnection.queryp("SELECT User_Id, Firstname, Name, Email FROM User WHERE User_Id = ?", [userID]);
	},

	async getUserByIdWithPw(userID) {
		return databaseConnection.queryp("SELECT User_Id, Firstname, Name, Email, Password FROM User WHERE User_Id = ?", [userID]);
	},

	async getUserByEmail(email) {
		return databaseConnection.queryp("SELECT * FROM User WHERE Email = ?", [email]);
	},

	async addUser(user) {
		return databaseConnection.queryp("INSERT INTO User (Firstname, Name, Email, Password, Image) VALUES (?,?,?,?,?)", [user.Firstname, user.Name, user.Email, encryptPassword(user.Password), user.Image]);
	},

	async deleteUser(id) {
		return databaseConnection.queryp("DELETE FROM User WHERE User_Id = ?", [id]);
	},

	async updateUser(id, user) {
		return databaseConnection.queryp("UPDATE User SET Firstname=?, Name=?, Email=?, Password=? where User_Id=?", [user.Firstname, user.Name, user.Email, user.Password, id]);
	}

};


module.exports = User;