import express from 'express';
import bodyParser from 'body-parser';
import path, { join } from 'path';
import database from './database';
import { server } from './config';
import applicationRouter from './router';

(async () => {

	/**
	 * Models
	 */
	// const User = require('./User/model');
	// const Post = require('./Post/model');
	// const Tag = require('./Tag/model');
	// const Category = require('./Category/model');

	const app = express();

	/**
	 * Body parser
	 */
	let extended = true;
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());

	/**
	 * Views
	 */
	app.set('views', join(server.root, '../views'));
	app.set('view engine', 'ejs');

	/**
	 * Database connection and model definition
	 */
	const connection = await database();
	// connection.define(User.name, User.schema, User.options).sync();
	// connection.define(Post.name, Post.schema, Post.options).sync();
	// connection.define(Tag.name, Tag.schema, Tag.options).sync();
	// connection.define(Category.name, Category.schema, Category.options).sync();
	app.locals.connection = connection;

	/**
	 * Routing
	 */
	const router = applicationRouter(connection);
	app.use(router);

	app.use(express.static(path.join(__dirname, '../admin')));
	app.use(express.static(path.join(__dirname, '../public'), { extensions: [ 'html' ] }));

	/**
	 * Start the server
	 */
	app.listen(server.port, (err: Error) => {
		if (err) {
			throw err;
		}
		console.log('Hello from Meadowlark at ', server.port);
	});
})();
