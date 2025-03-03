const Interview = require('../../models/Interview');

module.exports = {
  Query: {
    getInterviews: async () => {
      try {
        return await Interview.find();
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createInterview: async (_, { candidateId, interviewerId, questions }) => {
      const newInterview = new Interview({
        candidate: candidateId,
        interviewer: interviewerId,
        questions,
        status: 'Scheduled',
      });
      const res = await newInterview.save();
      return res;
    },
  },
};