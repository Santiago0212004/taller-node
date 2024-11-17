import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import { ApolloServer } from '@apollo/server';
import {expressMiddleware as apolloMiddleware} from '@apollo/server/express4' 

import { db } from './config/db';

dotenv.config();
import { router as user } from './routes/user.routes';
import { router as comment } from './routes/comment.routes';
import { router as reaction } from './routes/reaction.routes';

import { readFile } from 'node:fs/promises';
import { resolvers } from './graphql/resolvers';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

let typeDefs = await readFile("./src/graphql/schema.graphql", 'utf-8'); 

const apolloServer  =  new ApolloServer({typeDefs, resolvers}); 
await apolloServer.start();

app.use('/graphql', apolloMiddleware(apolloServer))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.use('/api/users', user);
app.use('/api/comments', comment);
app.use('/api/reaction', reaction)


db.then(() => {
    app.listen(port, () => {
        console.log(`Server is running  on port ${port}`);
    });
})
