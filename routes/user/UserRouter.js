const UserController = require('./UserController');
const router = require('express').Router();
const asyncMiddleware = require('../asyncMiddleware');
const myMiddleware = require('../../middleware/myMiddleware');


router.get('/', asyncMiddleware(UserController.getAllUsers));

router.get('/:userId', myMiddleware, asyncMiddleware(UserController.getUserById));

router.post('/', asyncMiddleware(UserController.addUser));

router.delete('/:userId', myMiddleware, asyncMiddleware(UserController.deleteUser));

router.put('/:userId', myMiddleware, asyncMiddleware(UserController.updateUser));


module.exports = router;
