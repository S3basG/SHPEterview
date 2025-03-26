const userResolvers = require('./user');
const interviewResolvers = require('./interview');

// Merge Query resolvers and remove any unexpected keys:
const mergedQueryResolvers = {
  ...userResolvers.Query,
  ...interviewResolvers.Query,
};

module.exports = {
  User: {
    id: (parent) => parent._id.toString(),
  },
  Interview: {
    id: (parent) => parent._id.toString(),
  },
  Query: mergedQueryResolvers,
  Mutation: {
    ...userResolvers.Mutation,
    ...interviewResolvers.Mutation,
  },
};