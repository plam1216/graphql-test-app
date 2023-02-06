const express = require('express')

// Destructure functions
const { graphqlHTTP } = require('express-graphql')

const schema = require('./schema/schema')

const PORT = 4000
const app = express()


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log("Listening on PORT", PORT)
})