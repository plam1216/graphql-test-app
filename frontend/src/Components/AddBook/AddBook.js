import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from '../../queries/queries'


const AddBook = ({client}) => {
    const [book, setBook] = useState({
        name: "",
        genre: "",
        authorId: ""
    })

    const { loading, error, data } = useQuery(GET_AUTHORS)
    const [addBook] = useMutation(ADD_BOOK)

    // console.log(data)

    const displayAuthors = () => {
        if (loading) return <option disabled>Loading...</option>;
        if (error) return <option disabled>Error Loading authors</option>;
        if (data) {
            const { authors } = data;
            return authors.map((author, index) => {
                return (<option key={index} value={author.id}> {author.name} </option>);
            })
        }
    }

    const handleChange = (event) => {
        setBook({ ...book, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(book)
        // adds book to databse
        addBook({
            variables: {
                name: book.name,
                genre: book.genre,
                authorId: book.authorId 
            },
            // refetch to show book on frontend in browser
            refetchQueries:[{query: GET_BOOKS}]
        })
    }


    return (
        <>
            < form id="add-book" onSubmit={handleSubmit} >
                <div className="field">
                    <label>Book Name</label>
                    <input type="text" name="name" onChange={handleChange} />
                </div>

                <div className="field">
                    <label>Genre</label>
                    <input type="text" name="genre" onChange={handleChange} />
                </div>

                <div className="field">
                    <label>Author</label>
                    <select name="authorId" onChange={handleChange}>
                        <option value="">Select author</option>
                        {displayAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form >
        </>
    )
}

export default AddBook