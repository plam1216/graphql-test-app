const graphql = require('graphql')
const _ = require('lodash')

const Book = require('../models/book.js')
const Author = require('../models/author.js')


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql

// const books = [
//     { name: 'Book1', genre: 'fiction', id: '1', authorId: '1' },
//     { name: 'Book2', genre: 'nonfiction', id: '2', authorId: '2' },
//     { name: 'Book3', genre: 'childrens', id: '3', authorId: '2' },
//     { name: 'Book4', genre: 'fantasy', id: '4', authorId: '3' }
// ]

// const authors = [
//     { name: 'Author1', age: 44, id: '1' },
//     { name: 'Author2', age: 62, id: '2' },
//     { name: 'Author3', age: 33, id: '3' }
// ]

// define Object Type on graph
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },

        // Type Relation
        author: {
            type: AuthorType,

            // retrive author whose id property equals parent.id (book.authorId);
            resolve(parent, args) {
                // console.log(parent)
                // return _.find(authors, { id: parent.authorId })
                return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },

        // Type Relation
        books: {
            type: new GraphQLList(BookType),

            // return books where authorId equals parent.id
            resolve(parent, args) {
                // return _.filter(books, {authorId: parent.id})
                return Book.find({ authorId: parent.id })
            }
        }

    })
})

////////////////////
// GraphiQL Query //
////////////////////
// {
//  book(id: '1') {
//   name: 'Book1',
//   genre: 'fiction',
//  }
// }

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,

            // arguments that can be passed when looking for a book
            // ex. book('123') search for book id '123'
            args: { id: { type: GraphQLID } },

            // code to get data from db
            resolve(parent, args) {
                // console.log(typeof (args.id))

                // _.find is a lodash method
                // return _.find(books, { id: args.id })

                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(authors, { id: args.id })
                return Author.findById(args.id)
            }
        },

        // return all books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books
                return Book.find({})
            }
        },

        // return list of authors
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors
                return Author.find({})
            }
        }
    }
})

////////////////////
// GraphiQL Query //
////////////////////
// mutation{
//     addAuthor(name: "Shawn", age: 30) {
//     	name
//     	age
//   }
// }


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parent, args) {
                // Author is mongoose schema imported from './models/author.js'
                // create a local instance of Author where
                // name is the name argument passed into addAuthor()
                // age is the age argument passed into addAuthor()
                let author = new Author({
                    name: args.name,
                    age: args.age
                })

                // save the local instance into MongoDB
                // author.save() returns an object
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID },
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                })

                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})