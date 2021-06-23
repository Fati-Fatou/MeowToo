// Imports
const express = require('express');
const router = express.Router();
const weightController = require('../controllers/weight');

router.post('/create/:idAnimal', weightController.weight_create);

router.get('/weight/:idAnimal', weightController.weight_get_all_by_animal);

router.get('/:idWeight', weightController.weight_get_weight);

router.patch('/:idWeight', weightController.weight_update_weight);

router.delete('/:idWeight', weightController.weight_delete_weight);

module.exports = router;