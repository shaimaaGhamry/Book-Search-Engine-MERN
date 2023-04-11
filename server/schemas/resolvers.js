const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query:{
        me: async (parent, arg, context)=>{
            console.log("INSIDE RESOLVER ME");
            console.log(context.user);
            if(context.user){
                return await User.findOne({_id: context.user._id}).populate('savedBooks');
            }
            throw new AuthenticationError("you need to be logged in");
        }
    },
    Mutation:{
        addUser:async (parent, {userName, email, password}) => {
            console.log("INSIDE ADD USER");
            const user = await User.create({userName, email, password});
            console.log(user);

            const token = signToken(user);
            console.log(token);
            return {token, user}
        },

        login: async (parent, {email, password}) => {
            console.log(email);
            console.log(password);
            const user = await User.findOne({email});
            console.log(user);
            if(!user)
                throw new AuthenticationError( "Incorrect Credentials");
            
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                return res.status(400).json({ message: 'Wrong password!' });
            }

            const token  = signToken(user);
            return { token, user};
        },

        // saveBook: async(parent, {bookDetails}, context) =>{
        //     console.log(context.user);
        //     if (context.user){
        //         return  User.findOneAndUpdate(
        //             { _id: context.user._id },
        //             { $addToSet: { savedBooks:{ 
        //                  title: bookDetails.title, 
        //                 authors: bookDetails.authors, 
        //                 description:bookDetails.description,
        //                 link:bookDetails.link,
        //                 image: bookDetails.image,
        //                 bookId:bookDetails.bookId
        //             } }},
        //             { new: true, runValidators: true }
        //         );
        //     }
           
        //     throw new AuthenticationError("u need to login") 
        // },

        saveBook: async(parent, {bookId, authors, description,title,image, link }, context) =>{
            console.log("INSIDE SAve Book");
            console.log(context.user);
            if (context.user){
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks:{ 
                        bookId:bookId,
                         title: title, 
                        authors:authors, 
                        description:description,
                        link:link,
                        image: image,
                        
                    } }},
                    { new: true, runValidators: true }
                );
            }
           
            throw new AuthenticationError("u need to login") 
        },
        removeBook: async(parent, {bookIdArg}, context) => {
            console.log("remove book");
            if(context.user){
                console.log(context.user);
                console.log("==========");
                const user =await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { 
                        bookId: bookIdArg,
                    } } },
                    {runValidators: true,new: true }
                  ); 
                  console.log(user.savedBooks.length);

                    console.log(user);
                return user;
            }
            throw new AuthenticationError("u need to login")
        }
    }

};

module.exports = resolvers;