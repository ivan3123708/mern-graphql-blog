const path = require('path');
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const { prisma } = require('./prisma/generated/prisma-client');
const resolvers = require('./src/resolvers');
const getUserId = require('./src/utils/getUserId');

const typeDefs = importSchema('./src/schema.graphql');

const app = express();

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

    const userId = await getUserId(token);

    return { userId, prisma };
  }
});

server.applyMiddleware({
  app,
  path: '/api/graphql'
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
});

app.listen({ port: 4000 }, () => console.log('SERVER IS UP...'));