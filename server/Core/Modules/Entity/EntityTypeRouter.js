"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EntityTypeController_1 = __importDefault(require("./EntityTypeController"));
const EntityType_1 = __importDefault(require("./EntityType"));
const router = express_1.Router();
exports.default = (connection) => {
    EntityType_1.default.defineTables(connection);
    const controller = new EntityTypeController_1.default(connection);
    router.get('/admin/entity-types', controller.renderEntityTypes.bind(controller));
    return router;
};
