const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// 1. Define Types
// 2. Define Relationships
// 3. Define RootQuery

// Dummy Data

// let books = [
//   { id: 1, name: "Harry Porter", genre: "Fantasy", authorId: 1 },
//   { id: 2, name: "Lord Of The Rings", genre: "Fantasy", authorId: 2 },
//   { id: 3, name: "Don", genre: "Bollywood", authorId: 3 },
//   { id: 4, name: "Harry Porter 2", genre: "Fantasy", authorId: 1 },
//   { id: 4, name: "Harry Porter 3", genre: "Fantasy", authorId: 1 },
//   { id: 5, name: "Don 2", genre: "Bollywood", authorId: 3 },
//   { id: 6, name: "The Great Gatsby", genre: "Fiction", authorId: 4 },
//   { id: 7, name: "The Curious Case of Benjamin Button", genre: "Fiction", authorId: 4 },
// ];

const Book = require('../models/book')

const Author = require('../models/author')

// let authors = [
//   { id: 1, name: "J.K.Rowling", age: 53 },
//   { id: 2, name: "J.R.R", age: 87 },
//   { id: 3, name: "Sharukh Khan", age: 53 },
//   { id: 4, name: "Scott Fitzgerald", age: 44 }
// ];



const BookType = new GraphQLObjectType({
  name: "Books",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLInt },
    author: {
        // Author Type Is Defined Below But It Still Works ( Reason Y We use function in fields and not just an object)
      type: AuthorType,
      resolve(parent, args) {
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
    age: { type: GraphQLInt },
    books : {
        type: new GraphQLList(BookType),
        resolve(parent,args){
            return _.filter(books, {authorId: parent.id})
        }
    }
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
    },
    books: {
        type: new GraphQLList(BookType),
        resolve(parent, args){
            return books
        }
    },
    authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent,args){
            return authors
        }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields:{
    addAuthor:{
      type: AuthorType,
      args:{
        name: {type: GraphQLString},
        age: {type: GraphQLID},
      },
      resolve(parent, args){
        let author = new Author()
        author.name= args.name,
        author.age = args.age
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
       name: {type: GraphQLString},
       genre: {type: GraphQLString},
       authorId: {type: GraphQLInt}
      },
      resolve(parent, args){

        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        return book.save()
        
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
