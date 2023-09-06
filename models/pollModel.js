const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    ref: 'User',
    required: true,
  },
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
