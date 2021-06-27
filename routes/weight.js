// Imports
const express = require('express');

const router = express.Router();
const weightController = require('../controllers/weight');

router.post('/create/:idAnimal', weightController.weights_create_weight);
router.get('/weight/:idAnimal', weightController.weights_get_all_by_animal);
router.get('/:idWeight', weightController.weights_get_weight);
router.patch('/:idWeight', weightController.weights_update_weight);
router.delete('/:idWeight', weightController.weights_delete_weight);

module.exports = router;
