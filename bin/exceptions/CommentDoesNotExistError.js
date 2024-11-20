"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommentDoesNotExistError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.stack = `${message} : ${this.stack}`;
    }
}
exports.default = CommentDoesNotExistError;
