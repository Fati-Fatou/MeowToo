const express = require('express');

const router = express.Router();
const professionalCategoriesController = require('../controllers/professionalCategories');

router.post('/', professionalCategoriesController.professional_categories_create_category);
router.get('/', professionalCategoriesController.professional_categories_get_all);
router.get('/:idCategoriePro', professionalCategoriesController.professional_categories_get_category);
router.patch('/:idCategoriePro', professionalCategoriesController.professional_categories_update_category);
router.delete('/:idCategoriePro', professionalCategoriesController.professional_categories_delete_category);

module.exports = router;
