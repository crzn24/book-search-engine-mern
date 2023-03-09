const typeDefs = `#graphql
    type Query {
        #users: [User]
        #user(username: String!): User
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth #Accepts an email and password as parameters; returns an Auth type.
        addUser(username: String!, email: String!, password: String!): Auth #Accepts a username, email, and password as parameters; returns an Auth type.
        saveBook(bookData: BookInput!): User #Accepts a book author's arrav, description, title, bookld, image, and link as parameters: returns a User tvpe. (Look into creating what's known as an input tune to handle all of these parameters!) // TODO:
        removeBook(bookId: ID!): User #Accepts a book's bookId as a parameter: returns a User tvpe.
    }

    type User {
        _id: ID!
        username: String!
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

`;

module.exports = typeDefs;
