const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

const typeDefs = gql`
  type Query {
    hello: String
    user: User
  }
  type User {
    name: String
    posts: [Post]
  }
  type Post {
    title: String
    comments: [Comment]
  }
  type Comment {
    id: ID
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    user: () => ({ name: "Alice", posts: [{ title: "Post1", comments: [{ id: 1 }, { id: 2 }] }] })
  }
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(4000, '0.0.0.0', () => console.log('GraphQL backend listening on 4000'));
});

