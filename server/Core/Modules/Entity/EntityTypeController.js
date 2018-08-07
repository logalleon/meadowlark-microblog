"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const EntityType_1 = __importDefault(require("./EntityType"));
const config_1 = require("../../../config");
const ViewResolver_1 = require("../ViewResolver/ViewResolver");
const { root: serverRoot } = config_1.server;
class EntityTypeController {
    constructor(connection) {
        this.connection = connection;
    }
    async create(req, res) {
        let { label, machineName } = req.body;
        machineName = lodash_1.snakeCase(machineName);
        // @TODO validations
        const entityType = new EntityType_1.default(null, { label, machineName });
        // @TODO check for duplicates
        try {
            const status = await entityType.create(this.connection);
            res.sendStatus(200);
        }
        catch (e) {
            res.json(e);
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
        const resolver = req.app.locals.viewResolver;
        const entityTypes = await EntityType_1.default.findAll(req.app.locals.connection);
        const renderList = entityTypes.map((entityType) => {
            const renderable = entityType;
            renderable.editEntityLink = resolver.resolveUrlPath({
                domain: ViewResolver_1.Domains.ADMIN,
                structure: ViewResolver_1.ViewStructures.FORM,
                variation: ViewResolver_1.ViewVariations.EDIT,
                target: entityType.machineName
            });
            renderable.manageFieldsLink = resolver.resolveUrlPath({
                domain: ViewResolver_1.Domains.ADMIN,
                structure: ViewResolver_1.ViewStructures.FORM,
                variation: ViewResolver_1.ViewVariations.EDIT,
                target: entityType.machineName,
                relation: ViewResolver_1.ViewEntityRelation.FIELD
            });
            return renderable;
        });
        const createLink = resolver.resolveUrlPath({
            domain: ViewResolver_1.Domains.ADMIN,
            structure: ViewResolver_1.ViewStructures.FORM,
            variation: ViewResolver_1.ViewVariations.CREATE,
            target: EntityType_1.default.tableName
        });
        res.render(resolver.resolvePath({
            domain: ViewResolver_1.Domains.ADMIN,
            structure: ViewResolver_1.ViewStructures.VIEW,
            target: EntityType_1.default.tableName
        }), {
            title: 'Entity Types Here',
            entityTypes: renderList,
            createLink
        });
    }
    renderEntityTypeForm(req, res) {
        const resolver = req.app.locals.viewResolver;
        const viewLink = resolver.resolveUrlPath({
            domain: ViewResolver_1.Domains.ADMIN,
            structure: ViewResolver_1.ViewStructures.VIEW,
            target: EntityType_1.default.tableName
        });
        const submitAction = resolver.resolveUrlPath({
            domain: ViewResolver_1.Domains.ADMIN,
            structure: ViewResolver_1.ViewStructures.VIEW,
            target: EntityType_1.default.tableName
        });
        res.render(resolver.resolvePath({
            domain: ViewResolver_1.Domains.ADMIN,
            structure: ViewResolver_1.ViewStructures.FORM,
            variation: ViewResolver_1.ViewVariations.CREATE,
            target: EntityType_1.default.tableName
        }), {
            title: 'Create Entity Type',
            viewLink,
            submitAction
        });
    }
    async renderEditEntity(req, res) {
        res.sendStatus(200);
    }
}
exports.default = EntityTypeController;
