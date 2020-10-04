const {Router} = require('express');
const UserController = require('./controllers/user.controller');
const router = Router();

router.post('/user', UserController.createUser);
router.get('/users', UserController.getUsers);
router.route('/users/:userId').get(UserController.getUserById)
    .get(UserController.updateUserById)
    .put(UserController.updateUserById)
    .delete(UserController.deleteUserById);
module.exports = router;