const mongoose = require('mongoose');
const { model, Schema } = mongoose;


const InterviewSchema = new mongoose.Schema({
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    interviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    questions: [String],
    status: { type: String, default: "pending" }
});

module.exports = mongoose.model('Interview', InterviewSchema);
