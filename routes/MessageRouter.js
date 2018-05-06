const router = require('express').Router();
const MessageController = require('./MessageController');


router.get('/:messageId', MessageController.getMessagesOfActivity);

router.post('/', MessageController.createMessage);

router.put('/:messageId', MessageController.updateMessage);

router.delete('/:messageId', MessageController.deleteMessage);


module.exports = router;
