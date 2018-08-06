"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntityType_1 = __importDefault(require("./EntityType"));
const config_1 = require("../../../config");
const { root: serverRoot } = config_1.server;
class EntityTypeController {
    constructor(connection) {
        this.connection = connection;
    }
    async create(req, res) {
        const { label, machineName } = req.body;
        // @TODO validations
        const entityType = new EntityType_1.default(null, { label, machineName });
        // @TODO check for duplicates
        try {
            const status = await entityType.create(this.connection);
            res.sendStatus(200);
        }
        catch (e) {
            res.sendStatus(500);
        }
    }
    async findAll(req, res) {
        return new Promise(async (resolve, reject) => {
            const { machineName } = req.body;
            try {
                const entityTypes = await EntityType_1.default.findAllOfType(req.app.locals.connection, machineName);
                res.json(entityTypes);
            }
            catch (e) {
                res.sendStatus(500);
            }
        });
    }
    async renderEntityTypes(req, res) {
        const entityTypes = await EntityType_1.default.findAll(req.app.locals.connection);
        res.render(`./admin/admin__view__${EntityType_1.default.tableName}`, {
            title: 'Entity Types',
            entityTypes
        });
    }
}
exports.default = EntityTypeController;
