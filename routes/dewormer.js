const express = require('express');
const router = express.Router();
const models = require('../models');
const checkAuth = require('../middleware/check-auth');
const dewormerController = require('../controllers/dewormer');

router.post('/', checkAuth, dewormerController.dewormers_create_dewormer);
router.get('/:idDewormer', checkAuth, dewormerController.dewormers_get_dewormer);
router.get('/:idPet', checkAuth, dewormerController.dewormers_get_dewormer_by_pet);
router.patch('/:idDewormer', checkAuth, dewormerController.dewormers_update_dewormer);
router.delete('/:idDewormer', checkAuth, dewormerController.dewormers_delete_dewormer);

module.exports = router;