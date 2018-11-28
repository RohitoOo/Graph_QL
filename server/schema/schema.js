const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// 1. Define Types
// 2. Define Relationships
// 3. Define RootQuery

// Dummy Data

let books = [
  { id: "1", name: "Harry Porter", genre: "Fantasy" },
  { id: "2", name: "Lord Of The Rings", genre: "Fantasy" },
  { id: "3", name: "Don", genre: "Bollywood" }
];

const BookType = new GraphQLObjectType({
  name: "Books",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

// Where the User Can Jump in From the Front End To Grab Data

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } }, // Required To Query --> book(id:"123"){ name genre }
      resolve(parent, args) {
        // code to get data from Database or any other Source

        return _.find(books, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
