const { google } = require('googleapis');
const { groupPivot, getValues, addRow, updateRow, getRow } = require('./util');
const { ApolloServer, gql } = require('apollo-server');
const keys = require('./keys.json');
const { typeDefs } = require('./gql/types');
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
  // const opt = { spreadsheetId: '14dirzl8Gi4vDNwVnj2zAqdKozUQ8yeYqlC3uacQwdq4', range: 'A2:B5' };
  // let { data } = await gsapi.spreadsheets.values; //.get(opt);
  // return data.values;
  // console.log('data', data.values);
}







//# TODO: updateResponse mutation
//updateResponse(response: ResponseInput!, where: Int!): Boolean

const resolvers = {
  Query: {
    cuisine: async (_, args, ctx) => {
      console.log({ args });
      let id = Number(args.id) + 1;
      //let range = 'cuisine!' + 'A1:B10000';
      let ranges = ['cuisine!A1:B1', `cuisine!A${id}:B${id}`];   // TODO: Update placeholder value.
      const response = await getRow(client, ranges);

      return response;
    },
    // responses: async (_, args, ctx) => {
    //   const response = await getValues(ctx);

    //   return response;
    // },
    cuisine_meal: async (_, args, ctx) => {
      //console.log(client);
      let range = 'cuisine_meal!' + 'A1:10000';
      const response = await groupPivot(client, range);
      //const response = await getValues(client, range);
      console.log('responsegroupPivot', response);
      return response;
    },
    cuisines: async (_, args, ctx) => {
      //console.log(client);
      let range = 'cuisine!' + 'A1:10000';
      const response = await getValues(client, range);

      return response;
    },
    meals: async (_, args, ctx) => {
      //console.log(client);
      let range = 'meals!' + 'A1:10000';
      const response = await getValues(client, range);

      return response;
    },
    recipes: async (_, args, ctx) => {
      //console.log(client);
      let range = 'recipes!' + 'A1:E10000';
      const response = await getValues(client, range);

      return response;
    },
  },

  Mutation: {
    createResponse: async (_, { response }, ctx) => {

      const res = await addRow(client, response);
      return res;
    },
    updateCuisine: async (_, args, ctx) => {
      //console.log({ args });
      args.sheet = 'recipes';
      const res = await updateRow(client, args);
      return res;
    },
    updateRecipe: async (_, args, ctx) => {
      //console.log({ args });
      const res = await updateRow(client, args);
      return res;
    }

  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: async () => {
  //   // console.log(client);
  //   return client;
  // }
});


server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);

});
