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
const express_1 = require("express");
const EntityTypeController_1 = __importDefault(require("./EntityTypeController"));
const EntityType_1 = __importDefault(require("./EntityType"));
const ViewResolver_1 = __importStar(require("../ViewResolver/ViewResolver"));
const router = express_1.Router();
const viewResolver = new ViewResolver_1.default();
exports.default = async (connection) => {
    const result = await EntityType_1.default.defineTables(connection);
    const controller = new EntityTypeController_1.default(connection);
    router.get(viewResolver.resolveUrlPath({
        domain: ViewResolver_1.Domains.ADMIN,
        structure: ViewResolver_1.ViewStructures.VIEW,
        target: EntityType_1.default.tableName
    }), controller.renderEntityTypes.bind(controller));
    router.get(viewResolver.resolveUrlPath({
        domain: ViewResolver_1.Domains.ADMIN,
        structure: ViewResolver_1.ViewStructures.FORM,
        variation: ViewResolver_1.ViewVariations.CREATE,
        target: EntityType_1.default.tableName
    }), controller.renderEntityTypeForm.bind(controller));
    router.post(viewResolver.resolveUrlPath({
        domain: ViewResolver_1.Domains.ADMIN,
        structure: ViewResolver_1.ViewStructures.VIEW,
        target: EntityType_1.default.tableName
    }), controller.create.bind(controller));
    return router;
};
