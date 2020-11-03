
const { google } = require('googleapis');
const { groupPivot, getValues, updateRow, getRow } = require('./util');
const { ApolloServer } = require('apollo-server');
const keys = require('./keys.json');
const { typeDefs } = require('./gql/types');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, './public')));



// Authorzie.....................

const client = new google.auth.JWT(
  keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function (err, tokens) {
  if (err) {
    return console.log('err', err);

  } else console.log('connected!');
  return gsRun(client);
});

async function gsRun(cl) {

  return google.sheets({ version: 'v4', auth: cl });
}


//END  Authorzie.....................





const resolvers = {
  Query: {
    cuisine: async (_, args, ctx) => {
      console.log({ CUISINEARGS: args });
      let id = Number(args.id) + 1;
      let ranges = ['cuisine!A1:B1', `cuisine!A${id}:B${id}`];
      const response = await getRow(client, ranges);

      return response;
    },
    meal: async (_, args, ctx) => {

      let id = Number(args.id) + 1;
      let ranges = ['meals!A1:B1', `meals!A${id}:B${id}`];
      let response = '';
      try {
        response = await getRow(client, ranges);
      } catch (error) {
        throw 'error in meal';
      }

      return response;
    },
    recipy: async (_, args, ctx) => {

      let id = Number(args.id) + 1;
      let ranges = ['recipes!A1:E1', `recipes!A${id}:E${id}`];
      let response = '';
      try {
        response = await getRow(client, ranges);
      } catch (error) {
        throw ' error in recipes getRow';
      }

      return response;
    },

    cuisine_meal: async () => {
      let range = 'cuisine_meal!' + 'A1:10000';
      const response = await groupPivot(client, range);
      return response;
    },
    cuisines: async () => {
      let range = 'cuisine!' + 'A1:10000';
      const response = await getValues(client, range);

      return response;
    },
    meals: async () => {
      let range = 'meals!' + 'A1:10000';
      const response = await getValues(client, range);

      return response;
    },
    recipes: async () => {
      let range = 'recipes!' + 'A1:E10000';
      const response = await getValues(client, range);

      return response;
    },
  },

  Mutation: {
    updateRecipe: async (_, args, ctx) => {
      console.log({ args });
      const res = await updateRow(client, args);
      console.log('res123', res);
      return res;
    }

  }
};



const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  // context: async () => {
  //   // console.log(client);
  //   return client;
  // }
});

server.listen({ port: process.env.PORT || '4000' }).then(all => {
  console.log('all', all);
  console.log(`🚀  Server ready at ${all.url}`);

});

app.get('*', (req, res) => {
  res.send(express.static(path.join(__dirname, './public/index.html')));
});