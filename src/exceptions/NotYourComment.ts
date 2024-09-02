export default class NotYourComment extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        this.stack = `${message} : ${this.stack}`;
    }
}
