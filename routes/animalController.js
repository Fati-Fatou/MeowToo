// Imports
const express = require('express');
var router = express.Router();
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');

router.get('/', (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
        message: 'GET requests to /animals'
    });
});

router.post('/', (req, res) => {
        models.Animal.create({
            nom: req.body.nom,
            dateNaissance: null,
            userId: 1,
            espece: req.body.espece,
            genre: req.body.genre,
            race: req.body.race
            // image: req.body.image
        }).then(function (newAnimal) {
            res.status(201).json(newAnimal.nom);
        }).catch(function (error) {
            res.status(500).json(({ 'error': error + ' Echer ajout nouvel animal' }));
        });
});

router.patch('/:animalId', (req, res, next) => {
    res.status(200).json({
        message: 'Animal mis à jour'
    })
});

router.delete('/:animalId',(reqs, res, next) => {
    res.status(200).json({
        message: 'Animal supprimé'
    });
});

module.exports = router;