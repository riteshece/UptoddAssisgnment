const Poll = require('../models/pollModel');

// Create a poll
const createPoll = async (req, res) => {
  try {
    console.log("body",req.body)
    const { title, description,owner } = req.body;
    const poll = await Poll.create({
        title: title,
        description: description,
        owner: owner
         });
    res.status(201).send({status:true,msg:"poll created successfully",data:poll});
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Internal server error' });
  }
};

// Retrieve all polls
const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.status(201).send({status:true,msg:"poll fetched successfully",data:polls});
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

// Retrieve a specific poll by ID
const getPollById = async (req, res) => {
  try {
    const pollId = req.params.pollId;
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).send({ error: 'Poll not found' });
    }
    res.status(201).send({status:true,msg:"poll fetched successfully",data:poll});
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

// Update a poll
const updatePoll = async (req, res) => {
  try {
    const pollId = req.params.pollId;
    const { title, description} = req.body;

    const poll = await Poll.findOneAndUpdate(
        {_id:pollId},
        { title:title,description:description,},
        {new:true,upsert:true}
        );

    res.status(201).send({status:true,msg:"poll fetched successfully",data:poll});
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

// Delete a poll
const deletePoll = async (req, res) => {
  try {
    const pollId = req.params.pollId;
    const poll = await Poll.findByIdAndDelete(pollId) 
    res.status(201).send({status:true,msg:"poll deleted successfully"});
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

// Vote on a poll
const vote = async (req, res) => {
  try {
    const pollId = req.params.pollId;
    const { optionId } = req.body;
    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).send({ error: 'Poll not found' });
    }
    const hasVoted = poll.options.some((option) =>
      option.votes.some((vote) => vote.user.equals(req.userId))
    );

    if (hasVoted) {
      return res.status(400).send({ error: 'You have already voted in this poll' });
    }
    const selectedOption = poll.options.id(optionId);
    selectedOption.votes.push({ user: req.userId });
    await poll.save();

    res.status(200).send({ message: 'Vote recorded successfully' });
  } catch (error){
    console.log(error)
  }
}

module.exports= {
    vote,
    createPoll,
    getAllPolls,
    getPollById,
    updatePoll,
    deletePoll
}