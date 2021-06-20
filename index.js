"use strict"

const { graphql, buildSchema } = require("graphql")

const schema = buildSchema(`

type Query {
  id: ID,
    name: String,
    age: Int,
    married: Boolean,
}

type Schema {
    query : Query
}
`)

const resolvers = {
  id: () => "1",
  name: () => "",
  age: () => 21,
  married: () => true,
}

const query = `
query myFirstQuery{
  id  
  name
  age
  married

}
`
graphql(schema, query, resolvers)
  .then((result) => console.log(result))
  .catch((error) => console.log(error))
