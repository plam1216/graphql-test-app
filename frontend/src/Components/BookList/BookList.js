import React from 'react'
import { useQuery } from '@apollo/client'

import { GET_BOOKS } from '../../queries/queries'


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