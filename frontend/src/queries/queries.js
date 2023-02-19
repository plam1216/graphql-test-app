import { gql } from "@apollo/client"

// Get All Books
const GET_BOOKS = gql`
    query GetBooks {
        books {
            name
            id
        }
    }
`

// Get All Authors
const GET_AUTHORS = gql`
    query GetAuthors{
        authors {
            name
            id
        }
    }
`

// variable name: type String (required)
// $name: String!
const ADD_BOOK = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name:$name, genre:$genre, authorId: $authorId) {
            name
            id
        }
    }
`

// Get Book Details
const GET_BOOK = gql`
    query GetBook($id: ID!) {
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`


export { GET_BOOKS, GET_AUTHORS, ADD_BOOK, GET_BOOK }