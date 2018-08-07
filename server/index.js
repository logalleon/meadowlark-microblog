"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importStar(require("path"));
const database_1 = __importDefault(require("./database"));
const config_1 = require("./config");
const router_1 = __importDefault(require("./router"));
const ViewResolver_1 = __importDefault(require("./Core/Modules/ViewResolver/ViewResolver"));
(async () => {
    try {
        /**
         * Models
         */
        // const User = require('./User/model');
        // const Post = require('./Post/model');
        // const Tag = require('./Tag/model');
        // const Category = require('./Category/model');
        const app = express_1.default();
        /**
         * Body parser
         */
        let extended = true;
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded());
        /**
         * Views
         */
        app.set('views', path_1.join(config_1.server.root, '../views'));
        app.set('view engine', 'ejs');
        app.locals.viewResolver = new ViewResolver_1.default();
        /**
         * Database connection and model definition
         */
        let connection;
        try {
            connection = database_1.default();
        }
        catch (connectionError) {
            throw (connectionError);
        }
        // connection.define(User.name, User.schema, User.options).sync();
        // connection.define(Post.name, Post.schema, Post.options).sync();
        // connection.define(Tag.name, Tag.schema, Tag.options).sync();
        // connection.define(Category.name, Category.schema, Category.options).sync();
        app.locals.connection = connection;
        /**
         * Routing
         */
        const router = await router_1.default(connection);
        app.use(router);
        app.use(express_1.default.static(path_1.default.join(__dirname, '../admin')));
        app.use(express_1.default.static(path_1.default.join(__dirname, '../public'), { extensions: ['html'] }));
        /**
         * Start the server
         */
        app.listen(config_1.server.port, (err) => {
            if (err) {
                throw err;
            }
            console.log('Hello from Meadowlark at ', config_1.server.port);
        });
    }
    catch (e) {
        throw (e);
    }
})();
