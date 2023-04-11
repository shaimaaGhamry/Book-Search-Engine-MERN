import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        userName
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($userName: String!, $email: String!, $password: String!) {
    addUser(userName: $userName, email: $email, password: $password) {
      token
      user {
        _id
        userName
        email
        password
        bookCount
        savedBooks{ 
          bookId
          title          
          authors
          description
          link
          image
        }
      }
    }
  }
`;


export const SAVE_BOOK = gql`
  mutation saveBook($bookId: String!, $authors:[String], $description:String, $title:String!, $image:String, $link:String) {
    saveBook(bookId: $bookId, authors:$authors, description:$description, title:$title, image:$image, link:$link ) {
      _id
      userName
      email
      bookCount
      savedBooks {        
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;


export const REMOVE_BOOK = gql`
  mutation removeBook($bookId:String!){
    removeBook(bookId:$bookId){
      _id
      userName
      email
      bookCount
      savedBooks {
        _id
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
    

`;