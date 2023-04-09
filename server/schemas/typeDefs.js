const { gql } = require('apollo-server-express');

const typeDefs = gql` 
    type Book{
        bookId:ID!
        authors:[String]
        description:String
        title:String!
        image: String
        link: String
    }

    input BookInput{
        bookId:ID!
        authors:[String]
        description:String
        title:String!
        image: String
        link: String
    }

    type User{
        _id : ID!
        userName: String!
        email:String!
        bookCount: Int
        savedBooks:[Book]
    }
    
    type Auth {
        token: ID!
        user: User
      }

    type Query{
        users:[User]
        getSingleUSer(userName:String!):User
        me:User
    }

    type Mutation{
        addUser(userName:String!, email:String!, password:String!):Auth
        login(email:String!, password:String!):Auth

        saveBook(bookDetails:BookInput): User
        removeBook(bookId:ID!):User
    }
`;


module.exports = typeDefs;