const { gql } = require('apollo-server-express');

const typeDefs = gql` 
    type Book{
        bookId:String!
        authors:[String]
        description:String!
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

        saveBook(title:String!, description:String!,  bookId:Int!, author:[String], image:String, link:String ): User
        removeBook(bookId:Int!):User
    }
`;


module.exports = typeDefs;