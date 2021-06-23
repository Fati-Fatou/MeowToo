// Imports
const express = require('express');
const router = express.Router();
const treatmentsController = require('../controllers/treatments');


router.post('/new', treatmentsController.treatments_create);

router.get('/:idAnimal', treatmentsController.treatments_get_all_By_Animal);

router.get('/:idTreatment', treatmentsController.treatments_get_treatment);

router.patch('/:idTreatment', treatmentsController.treatments_update_treatment);

router.delete('/:idTreatment', treatmentsController.treatments_delete_treatment);

module.exports = router;