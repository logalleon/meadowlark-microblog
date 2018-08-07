"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EntityTypeRouter_1 = __importDefault(require("./Core/Modules/Entity/EntityTypeRouter"));
const FieldRouter_1 = __importDefault(require("./Core/Modules/Field/FieldRouter"));
const router = express_1.Router();
exports.default = async (connection) => {
    return new Promise(async (resolve, reject) => {
        /**
         * Routes
         */
        // const Admin = require('./Admin/router');
        // const Post = require('./Post/router');
        // router.use(Admin);
        // router.use(Post);
        router.use(await EntityTypeRouter_1.default(connection));
        router.use(await FieldRouter_1.default(connection));
        resolve(router);
    });
};
