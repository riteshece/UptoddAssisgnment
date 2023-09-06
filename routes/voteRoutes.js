const express = require('express');
const router = express.Router();
const voteController = require('../Controllers/voteController');
const authMiddleware = require('../middleware/auth.js');

router.post('/create/vote', authMiddleware.auth, voteController.createVote);
router.get('/get/vote', authMiddleware.auth, voteController.getAllVotes);
router.get('/get/vote/:pollId', authMiddleware.auth, voteController.getVoteByPollId);

module.exports = router;
