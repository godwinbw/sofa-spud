import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        email
        savedShows {
          imdbId
          title
          titleType
          year
          plot
          imageURL
          thumbRating
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstname: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstname, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        email
        savedShows {
          imdbId
          title
          titleType
          year
          plot
          imageURL
          thumbRating
        }
      }
    }
  }
`;

export const SAVE_SHOW = gql`
  mutation saveShow($input: showInput!) {
    saveShow(input: $input) {
      _id
      firstname
      email
      imdbId
      title
      titleType
      year
      plot
      imageURL
      thumbRating
    }
  }
`;

export const REMOVE_SHOW = gql`
  mutation removeShow($showId: String!) {
    removeShow(imdbId: $showId) {
      _id
      firstname
      email
      savedBooks {
        imdbId
        title
        titleType
        year
        plot
        imageURL
        thumbRating
      }
    }
  }
`;