import Sequelize from 'sequelize';
import { db } from './config';

const {
	database,
	user,
	password,
	host,
	port,
	dialect
} = db;

const Database = () => {
	return new Sequelize('mysql://root:root@db:3306/meadowlark');
}

export default Database;
