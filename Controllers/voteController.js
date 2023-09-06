const voteModel = require('../models/voteModel');

const createVote = async (req, res) => {
 try{
    const {text,votes,pollId,userId}= req.body
    let voteData= await voteModel.find({
      Poll:pollId,
      user:userId
    })
    console.log("voteData",voteData)
    if(voteData.length>0){
      return res.status(400).send({status:false,msg:"you have already voted for this pole"})
    } 
    let vote= await voteModel.create({
      text:text,
      votes:votes,
      Poll:pollId,
      user:userId
    })
    return res.status(400).send({status:false,msg:"you have successfully voted for this pole",data:vote})
 }
  catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getAllVotes = async (req, res) => {
  try {
    const polls = await voteModel.find();
    res.status(201).send({status:true,msg:"poll fetched successfully",data:polls});
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

// Retrieve a all the votes by pollID

const getVoteByPollId = async (req, res) => {
  try {
    const pollId = req.params.pollId;
    const vote = await voteModel.find({Poll:pollId});
    if (!vote) {
      return res.status(404).send({ error: 'vote not found' });
    }
    res.status(201).send({status:true,msg:"vote fetched successfully",data:vote});
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};


module.exports= {
  createVote,
  getAllVotes,
  getVoteByPollId,
}