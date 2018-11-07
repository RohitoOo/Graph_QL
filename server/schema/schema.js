const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString } = graphql

const BookType = new GraphQLObjectType ({
     name: "Books",
     fields: () => ({
         id: {type: GraphQLString},
         name: {type: GraphQLString},
         genre: {type: GraphQLString}
     })
})

// Where the User Can Jump in From the Front End To Grab Data 

const RootQuery = new GraphQLObjectType ({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: GraphQLString }
        }
    }
})