const sql = require('sequelize');

const notNullString = {
	type: sql.STRING,
	allowNull: false
};

module.exports = {
	name: 'post',
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
		authorId: {
			type: sql.INTEGER,
			allowNull: false
		},
		authorFullName: notNullString,
		isDraft: sql.BOOLEAN,
		postDate: sql.DATE,
		title: notNullString,
		alias: notNullString,
		content: sql.TEXT
	}
}