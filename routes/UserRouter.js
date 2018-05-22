const UserController = require('./UserController');
const router = require('express').Router();
const { asyncMiddleware } = require('./errorHandler');


router.get('/', asyncMiddleware(UserController.getAllUsers));

router.get('/:userId', asyncMiddleware(UserController.getUserById));

router.post('/', asyncMiddleware(UserController.addUser));

router.delete('/:userId', asyncMiddleware(UserController.deleteUser));

router.put('/:userId', asyncMiddleware(UserController.updateUser));


module.exports = router;
