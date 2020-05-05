import express from 'express';
import { connect } from 'mongoose';
import constant from './utils/constant';
import { ApolloServer } from 'apollo-server-express';
import helper from './utils/helper';
import { typeDefs, resolvers } from './graphql/apolloServer';

const app = express();

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());

// Connect to MongoDB:
connect('mongodb://127.0.0.1:27017/todo_project', {
  useNewUrlParser: true,
});

import authRoutes from './auth/authRoutes';

app.use('/', authRoutes);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    if (!req) return null;
    const isAuth = await helper.jwt.isAuth(req);
    if (!isAuth) return null;
    return { req, res };
  },
});

apolloServer.applyMiddleware({ app, path: '/api' });

app.listen(constant.port.expressPort, () => {
  console.log('Connect to server successfully!');
});
