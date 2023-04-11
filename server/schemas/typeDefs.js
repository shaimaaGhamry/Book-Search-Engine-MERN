const { gql } = require('apollo-server-express');

const typeDefs = gql` 
    type Book{
        _id:ID!
        bookId:String!
        authors:[String]
        description:String
        title:String!
        image: String
        link: String
    }

    input BookInput{
        bookId:String!
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
        password: String
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

       saveBook(bookId: String!, authors:[String], description:String, title:String!, image:String, link:String): User
        removeBook(bookId:String!):User
    }
`;


module.exports = typeDefs;