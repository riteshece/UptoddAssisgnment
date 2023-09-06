const express = require('express');
const router = express.Router();
const pollController = require('../Controllers/pollController');
const authMiddleware = require('../middleware/auth.js');

router.post('/create/poll', authMiddleware.auth, pollController.createPoll);
router.get('/get-all-poll', pollController.getAllPolls);
router.get('/get/poll/:pollId', pollController.getPollById);
router.put('/update/poll/:pollId', authMiddleware.auth, pollController.updatePoll);
router.delete('/delete/poll/:pollId', authMiddleware.auth, pollController.deletePoll);


module.exports = router;
