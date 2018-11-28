const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const app = express();
const mongoose  = require('mongoose')

// Database Connection

mongoose.connect('mongodb://admin:Test12345!@ds137267.mlab.com:37267/graphql', { useNewUrlParser: true })

const db = mongoose.connection

db.once( "open", () => {
    console.log("We are Connected To The Database")
})

db.on('error', (err) => {
    console.log("Database Error", {err})
})

// Middle Ware ( One SuperCharged Endpoint To Rule Them All )

app.use(
  "/graphql",
  graphqlHTTP({
    // Options
    // Schema
    schema,
    // Used To Test GraphQL API - Similar To PostMan
    graphiql: true
  })
);


const Book = require('./models/book')

app.post('/testDatabase', (req,res) => {
    let book = new Book

    book.name = "Book B"
    book.genre = "Stranger Than Fiction"

    book.save( (err, data) => {
        if(err){
            console.log({err})
        }
        else{
            res.send({
                BookSaved: data
            })
        }
    })

})

app.get('/testDatabase', (req,res) => {
 
    Book.find({}, (err, data) => {
        res.send({
            Books : data
        })
    })

})

const port = 3000;
app.listen(port, () => {
  console.log("We Are Live On Port ", port);
});
