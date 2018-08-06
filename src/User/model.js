const sql = require('sequelize');

module.exports = {
	name: 'user',
	options: {},
	schema: {
		id: {
			type: sql.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		user: {
      type: sql.STRING,
      allowNull: false
    },
		password: {
      type: sql.STRING,
      allowNull: false
    },
		email: {
      type: sql.STRING,
      allowNull: false
    },
		firstName: {
      type: sql.STRING,
      allowNull: false
    },
		lastName: {
      type: sql.STRING,
      allowNull: false
    }
	}
}