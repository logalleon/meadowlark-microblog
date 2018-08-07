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
const FieldController_1 = __importDefault(require("./FieldController"));
const ViewResolver_1 = __importStar(require("../ViewResolver/ViewResolver"));
const router = express_1.Router();
const viewResolver = new ViewResolver_1.default();
exports.default = async (connection) => {
    //const result = await Field.defineTables(connection);
    const controller = new FieldController_1.default(connection);
    console.log(viewResolver.resolveParameterUrlPath({
        domain: ViewResolver_1.Domains.ADMIN,
        relation: true, variation: ViewResolver_1.ViewVariations.EDIT
    }));
    router.get(viewResolver.resolveParameterUrlPath({
        domain: ViewResolver_1.Domains.ADMIN,
        relation: true,
        variation: ViewResolver_1.ViewVariations.EDIT
    }), controller.renderManageFields.bind(controller));
    return router;
};
