const express = require('express');
const router = express.Router();
const models = require('../models');
const checkAuth = require('../middleware/check-auth');
const vaccineController = require('../controllers/vaccines');

router.post('/', checkAuth, vaccineController.vaccines_create_vaccine);
router.get('/:idPet', checkAuth, vaccineController.vaccines_get_vaccine_by_pet);
router.get('/:idVacine', checkAuth, vaccineController.vaccines_get_vaccine);
router.patch('/:idVaccine', checkAuth, vaccineController.vaccines_update_vaccine);
router.delete('/:idVaccine',checkAuth, vaccineController.vaccines_delete_vaccine);

module.exports = router;