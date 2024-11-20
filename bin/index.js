"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
dotenv_1.default.config();
const user_routes_1 = require("./routes/user.routes");
const comment_routes_1 = require("./routes/comment.routes");
const reaction_routes_1 = require("./routes/reaction.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/api/users', user_routes_1.router);
app.use('/api/comments', comment_routes_1.router);
app.use('/api/reaction', reaction_routes_1.router);
db_1.db.then(() => {
    app.listen(port, () => {
        console.log(`Server is running  on port ${port}`);
    });
});
