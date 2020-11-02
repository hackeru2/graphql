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
          meals {
            id
            type
          }
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
    mutation($cuisine_id : String!  , $meal_id: String! , $id:ID!)  {
      updateRecipe(cuisine_id:$cuisine_id,meal_id:$meal_id,id:$id){
        cuisine_id
      meal_id
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
export { getMealQuery, deleteBookMutation, updateBookMutation, getMealsQuery, getOneCuisine, getCuisineQuery, addBookMutation, getRecipyQuery, getMealCuisinePivotQuery, getAuthorsQuery, updateRecipeMutation };

