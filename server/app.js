const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Allow cross-origin requests
app.use(cors());

mongoose.connect('mongodb://graphql-tester:test123@ds139295.mlab.com:39295/graphql-test', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('Connected to DB!');
})

app.use('/graphql', graphqlHTTP({
    schema, // graph schema for graphql not mongo db
    graphiql: true,
}));

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Running a GraphQL API server at ${PORT}`));

