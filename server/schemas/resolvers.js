// TODO: Define the query and mutation functionality to work with the Mongoose models. Use the functionalitv in the user-controller.js is as a guide.
const { GraphQLError } = require("graphql");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      // me is your profile. context is usually contextValue. arguments and contextValue that returns context value
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password'); //TODO: figure out
        return userData;
      }
      throw new GraphQLError("You need to be logged in!", {
        extensions: {
          code: "UNAUTHENTICATED",
        },
      });
    },
  },

  Mutation: {
    // createUser from user-controller.js. create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    addUser: async (parent, args) => {
        const user = await user.create(args);
        const token = signToken(user);
        return { token, user };
    },
    // login from user-controller.js. login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
    login: async (parent, { email, password }) => {
        // this is the resolver for when someone does a query to login?
        const user = await User.findOne({ email });
        if (!user) {
          throw new GraphQLError("No profile with this email found!", { //TODO: AuthenticationError?
            extensions: {
              code: "UNAUTHENTICATED", //TODO: is this needed?
            },
        }); 
        }
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new GraphQLError('Incorrect password!', {
            extensions: {
              code: "UNAUTHENTICATED",
            },
        });
        }
  
        const token = signToken(user);
        return { token, user };
      },
      // saveBook from user-controller.js. save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates) // user comes from `req.user` created in the auth middleware function
      saveBook: async (parent, { bookData }, context) => {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { savedBooks: bookData } },
            { new: true }
          );
          return updatedUser;
        }
  
        throw new GraphQLError('You need to be logged in!');
      },
      // deleteBook from user-controller.js. remove a book from `savedBooks`
      removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          );
          return updatedUser;
        }
        throw new GraphQLError('You need to be logged in!');
      },
    },
};

module.exports = resolvers;
