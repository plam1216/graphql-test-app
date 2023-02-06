const express = require('express')

// Destructure functions
const { graphqlHTTP } = require('express-graphql')

const PORT = 4000
const app = express()


app.use('/graphql', graphqlHTTP({

}))

app.listen(PORT, () => {
    console.log("Listening on PORT", PORT)
})