const router = require('express').Router();
const MessageController = require('./MessageController');


router.get('/:activityId/message', MessageController.getMessagesOfActivity);

router.post('/:activityId/message', MessageController.createMessage);

router.put('/:activityId/message/:messageId', MessageController.updateMessage);

router.delete('/:activityId/message/:messageId', MessageController.deleteMessage);


module.exports = router;
