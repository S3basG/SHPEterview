/* 
This means when a GraphQL query like getUsers is made, 
it calls the function defined in user.js. 

Similarly, createInterview comes from interview.js.

*/
const userResolvers = require('./user');
const interviewResolvers = require('./interview');

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...interviewResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...interviewResolvers.Mutation,
  },
};