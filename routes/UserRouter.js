const UserController = require('./UserController');
const router = require('express').Router();


router.get('/', UserController.getAllUsers);

router.get('/:userId', UserController.getUserById);

router.post('/', UserController.addUser);

router.delete('/:userId', UserController.deleteUser);

router.put('/:userId', UserController.updateUser);


module.exports = router;
