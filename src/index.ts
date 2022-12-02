import schema from "./schema/schema";
const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const app = express()

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen('4000', ()=> {
  console.log('Hello World')
})
