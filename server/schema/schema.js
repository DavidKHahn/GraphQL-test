const graphql = require('graphql');
const _= require('lodash');

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLID
        } = graphql;

// dummy data
let books = [
    { name: 'Harry Potter', genre: 'Fiction', id: '1'},
    { name: 'Lord of the Rings', genre: 'Fiction', id: '2'},
    { name: 'How to Win Friends and Influence People', genre: 'Educational', id: '3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                // getting data from DB 
                console.log(type(args.id));
                return _.find(books, { id: args.id });
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});

