const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://graphql-tester:test123@ds139295.mlab.com:39295/graphql-test', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('Connected to DB!');
})

app.use('/graphql', graphqlHTTP({
    schema, // graph schema for graphql not mongo db
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
