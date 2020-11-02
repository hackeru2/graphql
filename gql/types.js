const { gql } = require('apollo-server');
const typeDefs = gql`
  type Get {
    id: String
    type: String
  }
  type GetCuisine   {
    id: ID
    name: String
    meals:[Meal]
  }

  type GetRecipe  {
    id: ID
    name: String
    description: String
    meal_id: String
    cuisine_id: String
    #meal:[Meal]
    #cuisine:[GetCuisine]
  }

  type Response {
   id: String
   type : String
  }
  type cuisine_meal {
    cuisine_id: Int
    meal_id : Int
   }
  type Meal {
    id: ID
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

  type RecipeMessage {
    cell: String  
    name: String
     
  }

  type Query {
    cuisine_meal : [cuisine_meal]
    responses: [Response]
    get : [Get]
    cuisines : [GetCuisine]
    meals : [Meal]
    cuisine (id:ID): GetCuisine
    recipes : [GetRecipe]
    
  }
  
  type Mutation {
    createResponse(response: ResponseInput!): Boolean
    updateCuisine(name : String!, where: Int!) : Message  
    updateRecipe(cuisine_id : String! , meal_id: String!, id:ID!)  : GetRecipe  
   
  }
  
  `;

module.exports = {
  typeDefs
};