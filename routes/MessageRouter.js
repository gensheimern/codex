const express = require('express');
const router = express.Router();
const MessageController = require('./MessageController');


router.get('/:id', MessageController.getMessagesOfActivity);

router.post('/', MessageController.createMessage);

router.put('/:id', MessageController.updateMessage);

router.delete('/:id', MessageController.deleteMessage);


module.exports = router;
