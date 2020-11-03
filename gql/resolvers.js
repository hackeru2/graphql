const { groupPivot, getValues, updateRow, getRow } = require('../util');
const { client } = require('../googleAuth');

const resolvers = {
  Query: {
    cuisine: async (_, args, ctx) => {
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
      const res = await updateRow(client, args);
      return res;
    }

  }
};


module.exports = {
  resolvers
};