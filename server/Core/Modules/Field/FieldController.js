"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FieldController {
    constructor(connection) {
        this.connection = connection;
    }
    renderManageFields(req, res) {
        const { target } = req.params;
        res.json(target);
    }
}
exports.default = FieldController;
