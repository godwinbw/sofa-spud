import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        watchListCount
        watchList {
          imdbId
          title
          titleType
          year
          plot
          imageUrl
          thumbRating
        }
      }
    }
  }
`;


export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        firstName
        email
        lastName
        _id
        watchList {
          imdbId
          title
          titleType
          year
          plot
          imageUrl
          thumbRating
        }
        watchListCount
      }
    }
  }
`;

export const SAVE_SHOW = gql`
  mutation saveShow(
    $imdbId: String!
    $title: String!
    $titleType: String
    $year: String
    $plot: String
    $imageUrl: String
  ) {
    addTitleToWatchlist(
      imdbId: $imdbId
      title: $title
      titleType: $titleType
      year: $year
      plot: $plot
      imageUrl: $importUrl
    ) {
      firstName
      email
      lastName
      watchListCount
      watchList {
        imdbId
        title
        titleType
        year
        plot
        imageUrl
        thumbRating
      }
    }
  }
`;

export const REMOVE_SHOW = gql`
  mutation removeShow($imdbId: String!) {
    removeTitleFromWatchlist(imdbId: $imdbId) {
      _id
      firstName
      lastName
      email
      watchListCount
      watchList {
        imdbId
        title
        titleType
        year
        plot
        imageUrl
        thumbRating
      }
    }
  }
`;

export const SET_THUMBS_UP = gql`
  mutation setThumbsUp($imdbId: String!) {
    updateWatchListTitleThumbsUp(imdbId: $imdbId) {
      _id
      firstName
      lastName
      email
      watchListCount
      watchList {
        imdbId
        title
        titleType
        year
        plot
        imageUrl
        thumbRating
      }
    }
  }
`;

export const SET_THUMBS_DOWN = gql`
  mutation setThumbsDown($imdbId: String!) {
    updateWatchListTitleThumbsDown(imdbId: $imdbId) {
      _id
      firstName
      lastName
      email
      watchListCount
      watchList {
        imdbId
        title
        titleType
        year
        plot
        imageUrl
        thumbRating
      }
    }
  }
`;

export const CLEAR_THUMB_RATING = gql`
  mutation clearThumbRating($imdbId: String!) {
    updateWatchListTitleClearThumbRating(imdbId: $imdbId) {
      _id
      firstName
      lastName
      email
      watchListCount
      watchList {
        imdbId
        title
        titleType
        year
        plot
        imageUrl
        thumbRating
      }
    }
  }
`;
