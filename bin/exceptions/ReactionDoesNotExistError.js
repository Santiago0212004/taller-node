"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReactionDoesNotExistError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.stack = `${message} : ${this.stack}`;
    }
}
exports.default = ReactionDoesNotExistError;
