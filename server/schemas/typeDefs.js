const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Title {
    _id: ID
    imdbId: String
    title: String
    titleType: String
    year: String
    plot: String
    imageUrl: String
    thumbRating: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    watchList: [Title]
    watchListCount: Int
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    searchForTitlesTmdbApi(searchString: String!): [Title]
    searchForSimilarTitlesTmdbApi(imdbId: String!, titleType: String!): [Title]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth

    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User

    login(email: String!, password: String!): Auth

    addTitleToWatchlist(
      imdbId: String!
      title: String!
      titleType: String
      year: String
      plot: String
      imageUrl: String
      thumbRating: String
    ): User

    removeTitleFromWatchlist(imdbId: String!): User

    updateWatchListTitleThumbsUp(imdbId: String!): User

    updateWatchListTitleThumbsDown(imdbId: String!): User

    updateWatchListTitleClearThumbRating(imdbId: String!): User
  }
`;

module.exports = typeDefs;
