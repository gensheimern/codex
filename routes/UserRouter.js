const UserController = require('./UserController');
const router = require('express').Router();


router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.getUserById);

router.post('/', UserController.addUser);

router.delete('/:id', UserController.deleteUser);

router.put('/:id', UserController.updateUser);


module.exports = router;
