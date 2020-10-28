const { google } = require('googleapis');
const { getValues, addRow, updateRow } = require('./util');
const { ApolloServer, gql } = require('apollo-server');
const keys = require('./keys.json');
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






const typeDefs = gql`
  type Get {
    id: String
    type: String
  }
  type GetCuisine {
    id: String
    name: String
    meals  :[Meal]
  }

  type Response {
   id: String
   type : String
  }
  type Meal {
    id: String
    type : String
   }
  input ResponseInput {
    id: String
    type : String
  }

  input InputVal {
    name : String
  }
  type Message {
    cell: String  
    name: String
     
  }
  type Query {
    responses: [Response]
    get : [Get]
    cuisines : [GetCuisine]
    
  }
  
  type Mutation {
    createResponse(response: ResponseInput!): Boolean
    updateCuisine(name : String!, where: Int!) : Message  
   
  }
  
  `;
//# TODO: updateResponse mutation
//updateResponse(response: ResponseInput!, where: Int!): Boolean

const resolvers = {
  Query: {
    // responses: async (_, args, ctx) => {
    //   const response = await getValues(ctx);

    //   return response;
    // },

    cuisines: async (_, args, ctx) => {
      console.log(client);
      let range = 'cuisine!' + 'A1:B10000';
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
      console.log({ args });
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
