const sequelize = require('sequelize');
const {
	database,
	user,
	password,
	host,
	port,
	dialect
} = require('./config').db;

const Database = () => {
	return new sequelize(database, user, password, {
		host,
		port,
		dialect,
    logging: false
	});
}
module.exports = Database;
