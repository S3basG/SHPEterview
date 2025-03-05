const Interview = require('../../models/Interview');

module.exports = {
 
 //finds all of the interview docs in the Interview collection
 //returns an array of interview objects
  Query: {
    getInterviews: async () => {
      try {
        return await Interview.find()
        .populate('candidate')
        .populate('interviewer');
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