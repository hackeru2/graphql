import { gql } from 'apollo-boost';

const getMealsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

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
const getBookQuery = gql`
    query($id:ID){
        book(id:$id) {
          id
          name
          genre
          author {
            id
            name
            age
            books {
              name
              id
            }
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
const deleteBookMutation = gql`
    mutation($id: ID!)  {
     deleteBook(id : $id){
      
        name
        id
      
     }    
    }
`;
export { deleteBookMutation, updateBookMutation, getMealsQuery, getBookQuery, getCuisineQuery, addBookMutation };

