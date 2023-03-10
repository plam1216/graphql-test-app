const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: {type: String},
    genre: {type: String},
    authorId: {type: String},
})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book