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
    meal_id: Int
    cuisine_id: Int
    meal:[Meal]
    cuisine:[GetCuisine]
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
    recipes : [GetRecipe]
    
    cuisine (id:ID): GetCuisine
    meal (id:ID): Meal
    recipy (id:ID) : GetRecipe
    
  }
  
  type Mutation {
    createResponse(response: ResponseInput!): Boolean,
   
    updateRecipe(cuisine_id : Int  , meal_id: Int , id:ID!)  : GetRecipe 
   
  }
  
  `;
//updateCuisine(name : String!, where: Int!) : Message

module.exports = {
  typeDefs
};