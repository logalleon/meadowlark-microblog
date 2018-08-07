"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const EntityType_1 = __importDefault(require("../Entity/EntityType"));
const Field_1 = __importDefault(require("../Field/Field"));
var Domains;
(function (Domains) {
    Domains["ADMIN"] = "admin";
    Domains["PUBLIC"] = "public";
})(Domains || (Domains = {}));
exports.Domains = Domains;
var ViewStructures;
(function (ViewStructures) {
    ViewStructures["FORM"] = "form";
    ViewStructures["VIEW"] = "view";
})(ViewStructures || (ViewStructures = {}));
exports.ViewStructures = ViewStructures;
var ViewVariations;
(function (ViewVariations) {
    ViewVariations["CREATE"] = "create";
    ViewVariations["EDIT"] = "edit";
})(ViewVariations || (ViewVariations = {}));
exports.ViewVariations = ViewVariations;
var ViewEntityRelation;
(function (ViewEntityRelation) {
    ViewEntityRelation[ViewEntityRelation["ENTITY_TYPE"] = 0] = "ENTITY_TYPE";
    ViewEntityRelation[ViewEntityRelation["FIELD"] = 1] = "FIELD";
})(ViewEntityRelation || (ViewEntityRelation = {}));
class ViewResolver {
    constructor() {
        this.structureDelimiter = '__';
        this.variantDelimiter = '--';
        this.defaultExtension = '.ejs';
    }
    resolvePath(options) {
        const { domain, structure, variation, target, extension, includeExtension } = options;
        let resolved = `./${domain}/${domain}${this.structureDelimiter}${structure}`; // @TODO path consistency
        resolved += variation ? `${this.variantDelimiter}${variation}` : '';
        resolved += `${this.structureDelimiter}${lodash_1.snakeCase(target)}`;
        resolved += includeExtension ? `${extension || this.defaultExtension}` : '';
        return resolved;
    }
    resolveUrlPath(options) {
        const { domain, structure, variation, target, relation } = options;
        let resolved = `/${domain}/${structure}/${lodash_1.kebabCase(lodash_1.lowerCase(target))}`;
        resolved += relation ? `/${lodash_1.kebabCase(this.getRelationPath(relation))}` : '';
        resolved += variation ? `/${variation}` : '';
        return resolved;
    }
    getRelationPath(relation) {
        switch (relation) {
            case ViewEntityRelation.ENTITY_TYPE:
                return EntityType_1.default.tableName;
            case ViewEntityRelation.FIELD:
                return Field_1.default.tableName;
        }
    }
}
exports.default = ViewResolver;
