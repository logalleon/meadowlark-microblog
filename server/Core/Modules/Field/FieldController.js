"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const ViewResolver_1 = require("../ViewResolver/ViewResolver");
const EntityType_1 = __importDefault(require("../Entity/EntityType"));
class FieldController {
    constructor(connection) {
        this.connection = connection;
    }
    renderManageFields(req, res) {
        const { target } = req.params;
        const machineName = lodash_1.snakeCase(target);
        const title = 'Hello';
        const resolver = req.app.locals.viewResolver;
        res.render(resolver.resolvePath({
            domain: ViewResolver_1.Domains.ADMIN,
            target: EntityType_1.default.tableName,
            variation: ViewResolver_1.ViewVariations.EDIT,
            structure: ViewResolver_1.ViewStructures.FORM,
            relation: ViewResolver_1.ViewEntityRelation.FIELD
        }), { machineName, title });
    }
}
exports.default = FieldController;
