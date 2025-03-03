//Need to npm install apollo-server

const { ApolloServer }= require('apollo-server'); //We connected to ApolloServer
const { MONGODB } = require('./config.js') //We connected to MongoDB with the config file
const mongoose = require('mongoose'); //We connected to mongoose
const typeDefs = require('./graphql/TypeDefs');  //We connected to the typeDefs file
const resolvers = require('./graphql/resolvers'); //We connected to the resolvers file




/* Below is a ApolloServer constructor:

from documentation: 
- Returns an initialized ApolloServer instance.
- Takes an options object as a parameter.
*/




const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({ req })
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });

