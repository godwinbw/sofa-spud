import { gql } from "@apollo/client";

export const GET_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      email
      watchListCount
      watchList {
        imdbId: String
        title: String
        titleType: String
        year: String
        plot: String
        imageUrl: String
        thumbRating: String
      }
    }
  }
`;
