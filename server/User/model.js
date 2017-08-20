const sql = require('sequelize');

const notNullString = {
	type: sql.STRING,
	allowNull: false
};

module.exports = {
	name: 'user',
	options: {
		indexes: [

		]
	},
	schema: {
		id: {
			type: sql.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		user: notNullString,
		password: notNullString,
		email: notNullString,
		firstName: notNullString,
		lastName: notNullString
	}
}