import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { userTypeDefs } from './graphql/types/user.types';
import { userResolvers } from './graphql/resolvers/user.resolvers';
import dotenv from 'dotenv';
import { db } from './config/db';
import jwt from 'jsonwebtoken';
import { router as comment } from './routes/comment.routes';
import { router as reaction } from './routes/reaction.routes';

dotenv.config();

async function startServer() {
  const app: Express = express();
  
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // GraphQL Server Setup
  const server = new ApolloServer({
    typeDefs: userTypeDefs,
    resolvers: userResolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      
      if (!token) {
        return { user: null };
      }

      try {
        const user = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'secret');
        return { user };
      } catch (error) {
        return { user: null };
      }
    },
  });

  await server.start();
  
  // Apply GraphQL middleware
  server.applyMiddleware({ app });

  // REST Routes
  app.use('/api/comments', comment);
  app.use('/api/reaction', reaction);

  // Connect to database and start server
  db.then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 3000}`);
      console.log(`📊 GraphQL endpoint at http://localhost:${process.env.PORT || 3000}${server.graphqlPath}`);
    });
  });
}

startServer();