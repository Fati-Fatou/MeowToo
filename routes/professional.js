// Imports
const express = require('express');

const router = express.Router();
const professionalsController = require('../controllers/professionals');

router.post('/', professionalsController.professionals_create_professional);
router.get('/', professionalsController.professionals_get_all_by_user);
router.get('/:idProfessionalCategory/professionalsByCategory', professionalsController.professionals_get_all_by_category);
router.get('/:idProfessional', professionalsController.professionals_get_professional);
router.patch('/:idProfessional', professionalsController.professionals_update_professional);
router.delete('/:idProfessional', professionalsController.professionals_delete_professional);

module.exports = router;
