const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const animalController = require('../controllers/animals');

router.post('/', upload.single('image'), animalController.animals_create_animal);

router.get('/', animalController.animals_get_all);

router.get('/:idAnimal', animalController.animals_get_animal);

router.patch('/:animalId', upload.single('image'), animalController.animals_update_animal);

router.delete('/:animalId', animalController.animals_delete_animal);

module.exports = router;