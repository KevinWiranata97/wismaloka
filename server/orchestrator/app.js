// const express = require("express");
const { ApolloServer, gql } = require("apollo-server");
// const {
//   graphqlUploadExpress, // A Koa implementation is also exported.
// } = require("graphql-upload");

const userSchema = require("./schema/userSchema");
const houseSchema = require("./schema/houseSchema");

// async function startServer() {
const server = new ApolloServer({
  typeDefs: [userSchema.typeDefs, houseSchema.typeDefs],
  resolvers: [userSchema.resolvers, houseSchema.resolvers],
  csrfPrevention: true,
  introspection: true,
  playground: true,
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
