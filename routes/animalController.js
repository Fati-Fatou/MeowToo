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

router.patch('/:animalId', upload.single('image'), (req, res) => {
    // Param
    var animalId = req.params.animalId;
    var pNom = req.body.nom;
    var pDateNaissance = req.body.dateNaissance;
    var pEspece = req.body.espece;
    var pGenre = req.body.genre;
    var pRace = req.body.race;
    var pImage = req.file;

    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Animal.findOne({
        where: { id: animalId }
    }).then(function(animalFound) {
        if (animalFound) {
            
    models.Animal.update({
        nom: (pNom ? nom: animalFound.nom),
        dateNaissance: (pDateNaissance ? dateNaissance : animalFound.dateNaissance),
        espece: (pEspece ? espece : animalFound.espece),
        genre: (pGenre ? genre : animalFound.genre),
        race: (pRace ? race : animalFound.race),
        image: (pImage ? image : animalFound.image) 
    }).then(function (animalUpdated) {
        return res.status(200).json(animalUpdated);
    }).catch(function (error) {
        return res.status(400).json({ 'error': error + ' Echec mise à jour de l\'animal' });
    });

        } else {
            return res.status(400).json({ 'Error': ' Animal absent de la base de données' });
        }
    }).catch(function(error) {
        return res.status(500).json({ 'Error ' + error + ' Récupération de l\'animal impossible' });
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

    models.Animal.destroy({
        where: { id: animalId }
    }).then(function (animalDeleted) {
        if (animalDeleted) {
            return res.status(200).json(animalDeleted);
        } else {
            return res.status(400).json({ 'Error': ' L\'animal n\'a pas été supprimé' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Supression de l\'animal impossible' });
    });
});

module.exports = router;