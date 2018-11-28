const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const app = express();

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

const port = 3000;
app.listen(port, () => {
  console.log("We Are Live On Port ", port);
});
