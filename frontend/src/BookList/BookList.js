import React from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_BOOKS = gql`
    query GetBooks {
        books {
            name
            id
        }
    }
`

const BookList = () => {
    const { loading, error, data } = useQuery(GET_BOOKS)
    console.log(data)

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    return (
        <>
            <ul id="book-list">
                {data.books.map(book => {
                    return (
                        <li>{book.name}</li>
                    )
                })}
            </ul>
        </>
    )
}

export default BookList