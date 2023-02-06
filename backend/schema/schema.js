const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

const books = [
    {name: 'Book1', genre: 'fiction', id: '1'},
    {name: 'Book2', genre: 'nonfiction', id: '2'}
]

// define Object Type on graph
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,

            // arguments that can be passed when looking for a book
            // ex. book('123') search for book id '123'
            args: { id: { type: GraphQLString } },

            // code to get data from db
            resolve(parent, args) {
                return _.find(books, { id: args.id })
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