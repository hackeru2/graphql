import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;


const getMealCuisinePivotQuery = gql`
    {
        cuisine_meal {
            cuisine_id 
             meal_id
        }
    }
`;

const getMealsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

const getMealQuery = gql`
    {
        meals {
            id
            type
        }
    }
`;

const getRecipyQuery = gql`
    {
        recipes {
            name
            id
            description
            meal_id
            cuisine_id    
          
        }
    }
`;

// cuisine   {
//     name
//     id
// }
// meal  {
//     type
//     id
// }




const getCuisineQuery = gql`
    {
        cuisines {
            name
            id
            meals   {
                type
                id
            }
        }
    }
`;
// const getOneCuisine = gql`
//     query($id:ID){
//         book(id:$id) {
//           id
//           name
//           genre
//           author {
//             id
//             name
//             age
//             books {
//               name
//               id
//             }
//           }
//         }
//     }
// `;

const getOneCuisine = gql`
    query($id:ID){
        cuisine(id:$id) {
          id
          name
        }
    }
`;

const getOneMeal = gql`
    query($id:ID){
        meal(id:$id) {
          id
          type
        }
    }
`;
const getOneRecipy = gql`
    query($id:ID){
        recipy(id:$id) {
          id
          name
          meal_id
          cuisine_id
          description
        }
    }
`;




const addBookMutation = gql`
    mutation($name : String! , $genre: String!, $authorId: ID!)  {
     addBook(name:$name,genre:$genre,authorId:$authorId){
      name
      id
     }    
    }
`;

const updateBookMutation = gql`
    mutation($name : String! , $genre: String!, $id:  ID!)  {
      updateBook(name:$name,genre:$genre,id:$id){
      name
      genre
      id
     }    
    }
`;

const updateRecipeMutation = gql`
    mutation($cuisine_id : Int!  , $meal_id: Int! , $id:ID!)  {
      updateRecipe(cuisine_id:$cuisine_id,meal_id:$meal_id,id:$id){
        meal_id
        cuisine_id
        id
     }    
    }
`;


const deleteBookMutation = gql`
    mutation($id: ID!)  {
     deleteBook(id : $id){
      
        name
        id
      
     }    
    }
`;
export { getOneRecipy, getOneMeal, getMealQuery, deleteBookMutation, updateBookMutation, getMealsQuery, getOneCuisine, getCuisineQuery, addBookMutation, getRecipyQuery, getMealCuisinePivotQuery, getAuthorsQuery, updateRecipeMutation };

