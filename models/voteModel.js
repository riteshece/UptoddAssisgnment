const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  Poll: {
    type: String,
    ref: 'Poll', 
    required: true,
  },
  user: {
    type: String,
    ref: 'User', 
    required: true,
  },

});

const Poll = mongoose.model('vote', voteSchema);

module.exports = Poll;
