import { gql } from '@apollo/client';

//execute the log inUser mutation set up using Apollo Server.
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
        }
    }
`;

//execute the addUser mutation.
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
        }
    }
`;

//execute the saveBook mutation.
export const SAVE_BOOK = gql`
    mutation saveBook($bookData: BookInput!) {
        saveBook(bookData: $bookData) {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
        }
    }
`;

//execute the removeBook mutation.
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
        }
    }
`;