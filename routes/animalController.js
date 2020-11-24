// Imports
const express = require('express');
const router = express.Router();
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/myAnimals', (req, res) => {
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Animal.findAll({
        include: [{
            model: models.Utilisateur,
            attributes: ['id'],
            as: 'utilisateur',
            where: {
                id: userId
            }
        }]
    }).then(function (myAnimalsList) {
        return res.status(200).json(myAnimalsList)
    }).catch(function (error) {
        return res.status(400).json({ 'error': error + ' Echec récuperation des animaux' });
    });
});

router.post('/new', upload.single('image'), (req, res) => {
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Animal.create({
        nom: req.body.nom,
        dateNaissance: req.body.dateNaissance,
        userId: userId,
        espece: req.body.espece,
        genre: req.body.genre,
        race: req.body.race,
        image: req.file
    }).then(function (newAnimal) {
        return res.status(201).json(newAnimal.nom);
    }).catch(function (error) {
        return res.status(500).json(({ 'error': error + ' Echec ajout nouvel animal' }));
    });
});

router.patch('/:animalId', (req, res) => {
    // Param
    var animalId = req.params.animalId;

    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Animal.update({
        attributes: ['nom', 'dateNaissance', 'espece', 'genre', 'race', 'image'],
        where: { id: animalId }
    }).then(function (animalUpdated) {
        return res.status(200).json(animalUpdated);
    }).catch(function (error) {
        return res.status(400).json({ 'error': error + ' Echec mise à jour de l\'animal' });
    });

});

router.delete('/:animalId', (req, res) => {
    // Param
    var animalId = req.params.animalId;
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Animal.delete({
        where: { id: animalId }
    }).then(function (userDeleted) {
        if (userDeleted) {
            return res.status(200).json(userDeleted);
        } else {
            return res.status(400).json({ 'Error': ' Supression de l\'animal impossible' });
        }
    }).catch(function (error) {
        return res.status(400).json({ 'Error': error + ' Animal absent de la base de données' });
    });
});

module.exports = router;