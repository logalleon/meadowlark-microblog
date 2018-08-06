"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
}
