const sql = require('sequelize');

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
			allowNull: false
		},
		authorFullName: {
      type: sql.STRING,
      allowNull: false
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
}