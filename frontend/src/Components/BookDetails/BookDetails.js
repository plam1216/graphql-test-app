import React from 'react'

import { useQuery } from '@apollo/client'
import { GET_BOOK } from '../../queries/queries'


const BookDetails = ({ bookId }) => {
    const { loading, data } = useQuery(GET_BOOK, {
        variables: { id: bookId }
    })

    let display;

	if (loading) {
		display = <div>loading</div>;
	} else {
        const { book } = data;
		display = (
			<div>
				<h2>{book.name}</h2>
				<p>Genre: {book.genre}</p>
				<p>Author: {book.author.name}</p>
				<p style={{fontWeight: "bold"}}>All books by this author:</p>
				<ul className="other-books">
					{book.author.books.map((item) => {
						return <li key={item.id}>{item.name}</li>;
					})}
				</ul>
			</div>
		);
	}

	return <div id="book-details">{display}</div>;
}

export default BookDetails