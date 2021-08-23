import gql from 'graphql-tag';

export const GET_USER = gql `
{
    me {
        _id
        username
        email
        bookCount
        savedTitles {
            imdbId
            authors
            title
            description
            image
            link
        }
    }
}
`;