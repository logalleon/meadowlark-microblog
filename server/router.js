"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EntityTypeRouter_1 = __importDefault(require("./Core/Modules/Entity/EntityTypeRouter"));
const router = express_1.Router();
exports.default = (connection) => {
    /**
     * Routes
     */
    // const Admin = require('./Admin/router');
    // const Post = require('./Post/router');
    // router.use(Admin);
    // router.use(Post);
    router.use(EntityTypeRouter_1.default(connection));
    return router;
};
