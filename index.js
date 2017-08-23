const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const database = require('./database');
const {server} = require('./config');

/**
 * Models
 */
const User = require('./server/User/model');
const Post = require('./server/Post/model');
const Tag = require('./server/Tag/model');
const Category = require('./server/Category/model');

const app = new express();

/**
 * Body parser
 */
let extended = true;
app.use(bodyParser.json({extended}));
app.use(bodyParser.urlencoded({extended}));

/**
 * Views
 */
app.set('views', server.root + '/server/views');
app.set('view engine', 'ejs');

/**
 * Database connection and model definition
 */
const connection = database();
connection.define(User.name, User.schema, User.options).sync();
connection.define(Post.name, Post.schema, Post.options).sync();
connection.define(Tag.name, Tag.schema, Tag.options).sync();
connection.define(Category.name, Category.schema, Category.options).sync();
app.locals.connection = connection;

/**
 * Routing
 */
app.use(require('./router'));

app.use(express.static(path.join(__dirname, 'admin')));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Start the server
 */
app.listen(server.port, (err) => {
	if (err) {
		throw err;
	}
	console.log('Hello from Meadowlark at ', server.port);
});
