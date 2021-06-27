const express = require('express');

const router = express.Router();
const vaccineController = require('../controllers/vaccines');

router.post('/', vaccineController.vaccines_create_vaccine);
router.get('/:idPet', vaccineController.vaccines_get_vaccine_by_pet);
router.get('/:idVaccine/vaccin', vaccineController.vaccines_get_vaccine);
router.patch('/:idVaccine', vaccineController.vaccines_update_vaccine);
router.delete('/:idVaccine', vaccineController.vaccines_delete_vaccine);

module.exports = router;
