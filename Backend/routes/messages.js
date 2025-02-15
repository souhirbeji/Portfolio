const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.post('/', messageController.createMessage);
router.get('/', auth, messageController.getMessages);
router.post('/:id/reply', auth, messageController.replyToMessage);
router.delete('/:id', auth, messageController.deleteMessage);

module.exports = router;
