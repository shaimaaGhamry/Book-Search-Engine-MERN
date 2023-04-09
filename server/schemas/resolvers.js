const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query:{
        me: async (parent, arg, context)=>{
            if(context.user){
                return user.findOne({_id: context.user._id}).populate('savedBooks');
            }
            throw new AuthenticationError("you need to be logged in");
        }
    },
    Mutation:{
        addUser:async (parent, {userName, email, password}) => {
            const user = User.create({userName, email, password});
            const token = signToken(user);
            return {token, user}
        },

        login: async (parent, {email, password}) => {
            const user = User.findOne({email});

            if(!user)
                throw new AuthenticationError( "Incorrect Credentials");
            
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                return res.status(400).json({ message: 'Wrong password!' });
            }

            const token  = signToken(user);
            return { token, user};
        },

        saveBook: async(parent, {bookDetails}, context) =>{
            console.log(context.user);
            if (context.user){
                return  User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks:{ 
                         title: bookDetails.title, 
                        authors: bookDetails.authors, 
                        description:bookDetails.description,
                        link:bookDetails.link,
                        image: bookDetails.image,
                        bookId:bookDetails.bookId
                    } }},
                    { new: true, runValidators: true }
                );
            }
           
            throw new AuthenticationError("u need to login") 
        },
        removeBook: async(parent, {bookIdArg, bookTitle}, context) => {
            if(context.user){
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookIdArg, title:bookTitle } } },
                    { new: true }
                  );
            }
            throw new AuthenticationError("u need to login")
        }
    }

};

module.exports = resolvers;