const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');

router.get('/',vehicleController.getAll);
router.get('/:id',vehicleController.getOne);
router.post('/', vehicleController.create);
router.put('/:id', vehicleController.update);
router.delete('/:id', vehicleController.destroy);

module.exports  = router;