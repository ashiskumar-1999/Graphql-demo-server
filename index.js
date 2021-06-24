"use strict"

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
} = require("graphql")
const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const { getProfileById, getProfiles } = require("./src/data/index")

const PORT = process.env.PORT || 3000
const server = express()

const profileType = new GraphQLObjectType({
  name: "profile",
  description: "Profile of an user",
  fields: {
    id: {
      type: GraphQLID,
      description: "The ID of User",
    },
    name: {
      type: GraphQLString,
      description: "The name of User",
    },
    age: {
      type: GraphQLInt,
      description: "The age of user",
    },
    married: {
      type: GraphQLBoolean,
      description: "The married status of user",
    },
  },
})

const queryType = new GraphQLObjectType({
  name: "QueryType",
  description: " The root query type",
  fields: {
    profiles: {
      type: new GraphQLList(profileType),
      resolve: () => getProfiles,
    },
    profile: {
      type: profileType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "The id of a user",
        },
      },
      resolve: (_, args) => {
        return getProfileById(args.id)
      },
    },
  },
})
const schema = new GraphQLSchema({
  query: queryType,
})

server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
