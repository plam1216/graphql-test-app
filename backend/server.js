const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

// Destructure functions
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')

const PORT = 4000
const app = express()

app.use(cors())


mongoose.connect(process.env.MONGO_URI)

const db = mongoose.connection
db.on('connected', () => console.log("Connected to MongoDB"))
db.on('disconnected', () => console.log("Disconnected from MongoDB"))
db.on('error', (err) => console.log(err + "error connecting to MongoDB"))


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log("Listening on PORT", PORT)
})