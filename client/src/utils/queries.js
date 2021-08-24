import { gql } from "@apollo/client";

export const GET_USER = gql`
  {
    user {
      firstName
      lastName
      _id
      email
      watchList {
        thumbRating
        imageUrl
        plot
        year
        titleType
        title
        imdbId
        _id
      }
      watchListCount
    }
  }
`;
