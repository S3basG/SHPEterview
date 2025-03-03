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