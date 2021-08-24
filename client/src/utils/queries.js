import gql from 'graphql-tag';

export const GET_USER = gql `
{
    me {
        _id
        username
        email
        watchListCount
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