const { AuthenticationError } = require("apollo-server-express");
const { User, Title } = require("../models");
const { signToken } = require("../utils/auth");
const { searchRapidApiForTitles } = require("../utils/rapid-api-imdb");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate(
          "watchList"
        );
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },

    searchForTitles: async (parent, args, context) => {
      return await searchRapidApiForTitles(args.searchString);
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addTitleToWatchlist: async (parent, args, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { watchList: args } },
          { new: true, runValidators: true }
        );
      }

      throw new AuthenticationError("Not logged in");
    },

    removeTitleFromWatchlist: async (parent, args, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { watchList: { imdbId: args.imdbId } } },
          { new: true }
        );
      }

      throw new AuthenticationError("Not logged in");
    },

    updateWatchListTitleThumbsUp: async (parent, args, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id, "watchList.imdbId": args.imdbId },
          { $set: { "watchList.$.thumbRating": "thumbsUp" } },
          { new: true }
        );
      }

      throw new AuthenticationError("Not logged in");
    },

    updateWatchListTitleThumbsDown: async (parent, args, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id, "watchList.imdbId": args.imdbId },
          { $set: { "watchList.$.thumbRating": "thumbsDown" } },
          { new: true }
        );
      }

      throw new AuthenticationError("Not logged in");
    },

    updateWatchListTitleClearThumbRating: async (parent, args, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id, "watchList.imdbId": args.imdbId },
          { $unset: { "watchList.$.thumbRating": "" } },
          { new: true }
        );
      }

      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
