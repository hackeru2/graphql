

const { ApolloServer } = require('apollo-server-express');

const { typeDefs } = require('./gql/types');
const { resolvers } = require('./gql/resolvers');
const express = require('express');
// const path = require('path');
// var cors = require('cors');


const app = express();
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


// app.use(express.static(path.join(__dirname, './public')));


const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  // playground: true,
  // context: async () => {
  //   return client;
  // }
});


server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || '4000' }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);  