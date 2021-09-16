const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/',userController.getAll);
router.get('/:id',userController.getOne);
router.post('/', userController.create);
router.put('/', userController.update);

module.exports  = router;