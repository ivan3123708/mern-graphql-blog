const path = require('path');
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const { prisma } = require('./prisma/generated/prisma-client');
const resolvers = require('./src/resolvers');

const typeDefs = importSchema('./src/schema/Schema.graphql');

const app = express();

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// server.applyMiddleware({
//   app,
//   path: '/api/graphql',
//   context: () => ({
//     db: prisma
//   })
// });

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
});

app.listen({ port: 4000 }, () => console.log('SERVER UP'));