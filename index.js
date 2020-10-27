const { google } = require('googleapis');
const { getValues, addRow } = require('./util');
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

  enum Availability {
    LOW
    MED
    HIGH
  }
  
  enum CommunicationPreference {
    VIDEO_CHAT
    CHAT
    EMAIL
  }

  enum LearningStyle {
    TUTORIALS
    DOCUMENTATION
    PAIR PROGRAMMING
    BOOKS
  }

  enum SkillLevel {
    BEGINNER
    INTERMEDIATE
    ADVANCED
  }

  type ProgrammingLanguage {
    language: String!
    skill_level: SkillLevel
  }

  input ProgrammingLanguageInput {
    language: String!
    skill_level: SkillLevel
  }

  type Get {
    id: String
    type: String
  }

  type Response {
   id: String
   type : String
  }

  input ResponseInput {
    id: String
    type : String
  }

  type Query {
    responses: [Response]
    get : [Get]
  }
  
  type Mutation {
    createResponse(response: ResponseInput!): Boolean
    updateResponse(response: ResponseInput!, where: Int!): Boolean
    # TODO: updateResponse mutation
  }

`;

const resolvers = {
  Query: {
    responses: async (_, args, ctx) => {
      const response = await getValues(ctx);

      return response;
    },

    get: async (_, args, ctx) => {
      // console.log(client);
      const response = await getValues(client);
      console.log(response);
      return response;
    },
  },

  Mutation: {
    createResponse: async (_, { response }, ctx) => {

      const res = await addRow(client, response);
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
