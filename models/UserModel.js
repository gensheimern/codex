const databaseConnection = require('./DatabaseConnection');
const { hashPassword } = require('../routes/auth/Auth');

const User = {

	async getAllUsers() {
		return databaseConnection.queryp('SELECT * FROM User');
	},

	async getUserById(userID) {
		return databaseConnection.queryp('SELECT * FROM User WHERE User_Id = ?', [userID]);
	},

	async getUserByEmail(email) {
		return databaseConnection.queryp('SELECT * FROM User WHERE Email = ?', [email]);
	},

	async addUser(user) {
		return databaseConnection.queryp('INSERT INTO User (Firstname, Name, Email, Password, Image) VALUES (?,?,?,?,?)', [user.firstName, user.name, user.email, hashPassword(user.password), user.image]);
	},

	async deleteUser(id) {
		return databaseConnection.queryp('DELETE FROM User WHERE User_Id = ?', [id]);
	},

	async updateUser(id, user) {
		return databaseConnection.queryp('UPDATE User SET Firstname=?, Name=?, Email=?, Password=? where User_Id=?', [user.firstName, user.name, user.email, user.password, id]);
	},

};


module.exports = User;
