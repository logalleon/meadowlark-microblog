const sql = require('sequelize');

const notNullString = {
	type: sql.STRING,
	allowNull: false
};

module.exports = {
	name: 'category',
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
		postId: {
			type: sql.INTEGER,
			allowNull: false
		},
		name: notNullString
	}
}