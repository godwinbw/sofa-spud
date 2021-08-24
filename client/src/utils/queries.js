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

export const SEARCH_FOR_TITLES = gql`
  query searchForTitles($imdbId: String!) {
    searchForTitlesTmdbApi(searchString: $imdbId) {
      imdbId
      title
      titleType
      plot
      year
      imageUrl
    }
  }
`;

export const SEARCH_FOR_SIMILAR_TITLES = gql`
  query searchForSimilarTitles($imdbId: String!, $titleType: String!) {
    searchForSimilarTitlesTmdbApi(imdbId: $imdbId, titleType: $titleType) {
      imdbId
      title
      titleType
      year
      plot
      imageUrl
    }
  }
`;
