const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} = graphql;

// 1. Define Types
// 2. Define Relationships
// 3. Define RootQuery

// Dummy Data

let books = [
  { id: 1, name: "Harry Porter", genre: "Fantasy", authorId: 1 },
  { id: 2, name: "Lord Of The Rings", genre: "Fantasy", authorId: 2 },
  { id: 3, name: "Don", genre: "Bollywood", authorId: 3 }
];

let authors = [
  { id: 1, name: "J.K.Rowling", age: 53 },
  { id: 2, name: "J.R.R", age: 87 },
  { id: 3, name: "Sharukh Khan", age: 53 }
];

const BookType = new GraphQLObjectType({
  name: "Books",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log({ parent })
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Authors",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

// Where the User Can Jump in From the Front End To Grab Data

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLInt } }, // Required To Query --> book(id:"123"){ name genre }
      resolve(parent, args) {
        console.log({ parent });
        // code to get data from Database or any other Source
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
