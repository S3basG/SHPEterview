const Interview = require('../../models/Interview');
const User = require('../../models/User');
const auth = require('../Middleware/auth');

module.exports = {
  Query: {
    getInterviews: async (_, __, context) => {
      console.log('getInterviews called'); // Debug log
    
      // Authenticate the user
      const user = auth(context);
      console.log('Authenticated user:', user); // Debug log
    
      // Fetch interviews from the database
      const interviews = await Interview.find()
        .populate('candidate')
        .populate('interviewer'); // Ensure interviewer is populated
      console.log('Fetched interviews:', interviews); // Debug log
    
      return interviews;
    },
  },
  Mutation: {
    // filepath: c:\Users\sebth\Documents\SHPEGithub\SHPEterview\graphql\resolvers\interview.js
    createInterview: async (_, { candidateId, interviewerId, questions }, context) => {
      console.log('createInterview called'); // Debug log
    
      // Authenticate the user
      const user = auth(context);
      console.log('Authenticated user:', user); // Debug log
    
      // Validate candidate
      const candidate = await User.findById(candidateId);
      if (!candidate) {
        console.error('Candidate not found:', candidateId); // Debug log
        throw new Error('Candidate not found');
      }
      console.log('Candidate found:', candidate); // Debug log
    
      let interviewer = null;
    
      // If no interviewerId is provided, fetch a random user who isn't the logged-in user
      if (!interviewerId) {
        console.log('Fetching eligible interviewers...');
        const eligibleInterviewers = await User.find({ _id: { $ne: user.id } }); // Exclude the logged-in user
        console.log('Eligible interviewers:', eligibleInterviewers);
    
        if (eligibleInterviewers.length === 0) {
          throw new Error('No eligible interviewers found');
        }
    
        // Randomly select an interviewer
        const randomIndex = Math.floor(Math.random() * eligibleInterviewers.length);
        interviewer = eligibleInterviewers[randomIndex];
        console.log('Randomly selected interviewer:', interviewer); // Debug log
      } else {
        // Validate the provided interviewerId
        interviewer = await User.findById(interviewerId);
        if (!interviewer) {
          console.error('Interviewer not found:', interviewerId); // Debug log
          throw new Error('Interviewer not found');
        }
        console.log('Interviewer found:', interviewer); // Debug log
      }
    
      // Create a new interview document
      const newInterview = new Interview({
        candidate: candidate._id,
        interviewer: interviewer._id, // Use the selected interviewer
        questions,
        status: 'Scheduled',
      });
    
      console.log('New interview to save:', newInterview); // Debug log
    
      await newInterview.save();
    
      // Return the interview with populated candidate and interviewer fields
      const savedInterview = await Interview.findById(newInterview._id)
        .populate('candidate')
        .populate('interviewer');
      console.log('Saved interview:', savedInterview); // Debug log
    
      return savedInterview;
    },
  },
};