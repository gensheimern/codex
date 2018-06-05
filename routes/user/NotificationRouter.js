const router = require('express').Router();
const NotificationController = require('./NotificationController');
const asyncMiddleware = require('../asyncMiddleware');
const myMiddleware = require('../../middleware/myMiddleware');


router.get('/:userId/notifications/unseen', myMiddleware, asyncMiddleware(NotificationController.getUnseenNotifications));

router.get('/:userId/notifications', myMiddleware, asyncMiddleware(NotificationController.getNotifications));

router.delete('/:userId/notifications/:notificationId', myMiddleware, asyncMiddleware(NotificationController.deleteNotifications));


router.post('/:userId/decide/:notificationId', myMiddleware, asyncMiddleware(NotificationController.decideNotification));


module.exports = router;
