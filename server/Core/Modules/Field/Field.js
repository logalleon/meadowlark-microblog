"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
class Field {
    constructor(props, fieldable, connection) {
        this.relation = props.relation;
        this.type = props.type;
        this.label = fieldable.label;
        this.machineName = fieldable.machineName;
        this.connection = connection;
    }
    sync() {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }
    static defineTables() {
    }
}
Field.tableName = 'field';
Field.defaultAttributes = {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    label: {
        type: sequelize_1.default.STRING
    },
    machineName: {
        type: sequelize_1.default.STRING,
        unique: true
    }
};
exports.default = Field;
