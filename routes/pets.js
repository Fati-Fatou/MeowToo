const express = require('express');

const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const petController = require('../controllers/pets');

router.post('/', upload.single('image'), petController.pets_create_pet);
router.get('/', petController.pets_get_all);
router.get('/:idPet', petController.pets_get_pet);
router.patch('/:idPet', upload.single('image'), petController.pets_update_pet);
router.delete('/:idPet', petController.pets_delete_pet);

module.exports = router;
