"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const config_1 = require("./config");
const { database, user, password, host, port, dialect } = config_1.db;
const Database = () => {
    return new sequelize_1.default('mysql://root:root@db:3306/meadowlark');
};
exports.default = Database;
