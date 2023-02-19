import React from 'react'
import { useQuery } from '@apollo/client'

import { GET_AUTHORS } from '../../queries/queries'


const AddBook = () => {
    const { loading, error, data } = useQuery(GET_AUTHORS)
    console.log(data)


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

    return (
        <form id="add-book">
            <div>
                {/* <ul id="book-list">
                {displayBooks()}
            </ul> */}
                <form id="add-book">
                    <div className="field">
                        <label>Book Name</label>
                        <input type="text" />
                    </div>

                    <div className="field">
                        <label>Genre</label>
                        <input type="text" />
                    </div>

                    <div className="field">
                        <label>Author</label>
                        <select>
                            <option>Select author</option>
                            {displayAuthors()}
                        </select>
                    </div>

                    <button>+</button>

                </form>
            </div>
        </form>
    )
}

export default AddBook