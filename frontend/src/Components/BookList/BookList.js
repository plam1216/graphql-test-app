import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import { GET_BOOKS } from '../../queries/queries'

import BookDetails from '../BookDetails/BookDetails'

const BookList = () => {
    const { loading, error, data } = useQuery(GET_BOOKS)
    // console.log(data)

    const [selected, setSelected] = useState(null);


    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    return (
        <>
            <ul id="book-list">
                {data.books.map(book => {
                    return (
                        <li
                            key={book.id}
                            onClick={() => { setSelected(book.id) }}
                        >
                            {book.name}
                        </li>
                    )
                })}
            </ul>
            {selected ? <BookDetails bookId={selected} /> : <div>No book selected...</div>}
        </>
    )
}

export default BookList