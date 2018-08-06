const sequelize = require('sequelize');
const { database, user, password, host, port, dialect } = require('./config').db;
const Database = () => {
    return new sequelize('mysql://root:root@db:3306/meadowlark');
};
module.exports = Database;
