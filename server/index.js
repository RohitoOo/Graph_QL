const express = require('express');
const graphqlHTTP = require('express-graphql')

const app = express();


// Middle Ware 

app.use('/graphql', graphqlHTTP({
    
}))


const port = 3000
app.listen( port , () => {
    console.log("We Are Live On Port ", port)
})