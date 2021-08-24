import gql from 'graphql-tag';

export const GET_USER = gql `
{
    me {
        _id
        username
        email
        bookCount
        savedTitles {
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