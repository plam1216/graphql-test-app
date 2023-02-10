const graphql = require('graphql')
const _ = require('lodash')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql

const books = [
    { name: 'Book1', genre: 'fiction', id: '1', authorId: '1' },
    { name: 'Book2', genre: 'nonfiction', id: '2', authorId: '2' },
    { name: 'Book3', genre: 'childrens', id: '3', authorId: '2' },
    { name: 'Book4', genre: 'fantasy', id: '4', authorId: '3' }
]

const authors = [
    { name: 'Author1', age: 44, id: '1' },
    { name: 'Author2', age: 62, id: '2' },
    { name: 'Author3', age: 33, id: '3' }
]

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
                return _.find(authors, { id: parent.authorId })
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
                return _.filter(books, {authorId: parent.id})
            }
        }

    })
})

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
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }
        }
    }
})

// Frontend query will look like:
// book(id: '1') {
//  name: 'Book1',
//  genre: 'fiction',
// }

module.exports = new GraphQLSchema({
    query: RootQuery
})