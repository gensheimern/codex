const router = require('express').Router();
const MessageController = require('./MessageController');
const { asyncMiddleware } = require('./errorHandler');

router.get('/:activityId/message', asyncMiddleware(MessageController.getMessagesOfActivity));

router.post('/:activityId/message', asyncMiddleware(MessageController.createMessage));

router.put('/:activityId/message/:messageId', asyncMiddleware(MessageController.updateMessage));

router.delete('/:activityId/message/:messageId', asyncMiddleware(MessageController.deleteMessage));


module.exports = router;
