"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
class EntityType {
    constructor(props, fieldable) {
        this.label = fieldable.label;
        this.machineName = fieldable.machineName;
    }
    static async defineTables(connection) {
        return new Promise((resolve, reject) => {
            const { tableName: name } = EntityType;
            const attributes = Object.assign({}, EntityType.defaultAttributes);
            const options = {
                indexes: [
                    {
                        unique: true,
                        fields: ['machineName']
                    }
                ]
            };
            connection.define(name, attributes, options).sync()
                .then(() => {
                resolve(true);
            })
                .catch((e) => {
                reject(e);
            });
        });
    }
    async create(connection) {
        return new Promise((resolve, reject) => {
            const { tableName } = EntityType;
            connection.model(tableName).create({
                machine_name: this.machineName,
                label: this.label
            }).then(() => {
                resolve(true);
            }).catch((e) => {
                reject(e);
            });
        });
    }
    static async findAllOfType(connection, machineName) {
        return new Promise((resolve, reject) => {
            connection.model(machineName).findAll()
                .then((models) => {
                resolve(models);
            })
                .catch((e) => {
                console.log(e);
                resolve([]);
            });
        });
    }
    static async findAll(connection) {
        return new Promise((resolve, reject) => {
            connection.model(this.tableName).findAll()
                .then((models) => {
                resolve(models);
            })
                .catch((e) => {
                console.log(e);
                resolve([]);
            });
        });
    }
}
EntityType.tableName = 'entity_type';
EntityType.defaultAttributes = {
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
exports.default = EntityType;
