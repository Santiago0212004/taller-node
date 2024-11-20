"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserExistsError extends Error {
    constructor(message) {
        super('');
        this.name = this.constructor.name;
        this.stack = message + " : " + this.stack;
    }
}
exports.default = UserExistsError;
