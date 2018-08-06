const sql = require('sequelize');
const {firstName, lastName} = require('../../config').admin;
const authorId = 1;

module.exports = {
	name: 'post',
	options: {
		indexes: [
      {
        fields: ['postDate']
      },
      {
        fields: ['title']
      }
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
			allowNull: false,
      defaultValue: authorId
		},
		authorFullName: {
      type: sql.STRING,
      allowNull: false,
      defaultValue: firstName + ' ' + lastName
    },
		isDraft: sql.BOOLEAN,
		postDate: sql.DATE,
		title: {
      type: sql.STRING,
      allowNull: false
    },
		alias: {
      type: sql.STRING,
      unique: true,
      allowNull: false
    },
		content: sql.TEXT
	}
};
