const Interview = require('../../models/Interview');
const auth = require('../Middleware/auth');

module.exports = {
 
 //finds all of the interview docs in the Interview collection
 //returns an array of interview objects
  Query: {
    getInterviews: async (_, __, context) => {
      auth(context);
      return await Interview.find()
        .populate('candidate')
        .populate('interviewer');
    },
  },
  Mutation: {
    createInterview: async (_, { candidateId, interviewerId, questions }) => {
      auth(context);
      const newInterview = new Interview({
        candidate: candidateId,
        interviewer: interviewerId,
        questions,
        status: 'Scheduled',
      });
      await newInterview.save();
      
      const populatedInterview = await Interview.findById(newInterview._id)
        .populate('candidate')
        .populate('interviewer');
    
      return populatedInterview;
    },
  },
};