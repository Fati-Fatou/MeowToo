// Imports
const express = require('express');
var router = express.Router();
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.get('/myAnimals', (req, res) => {
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }
    
    models.Utilisateur.findOne({
        where: { id: userId }
    }).then(function(userFound) {
        if(userFound) {
            models.Animal.findAll({
                include: [{
                    model: models.Utilisateur,
                    attributes: ['id'],
                    as: 'utilisateur',
                    where: {
                        id: userFound.id
                      }
                  }]
            }).then(function(myAnimalsList) {
                return res.status(200).json(myAnimalsList)
            }).catch(function(error) {
                return res.status(400).json({ 'error': error + ' Echec récuperation des animaux' });
            })
        } else {
            return res.status(400).json({ 'error': error + ' Echec identification utilisateur' });
        }
    }).catch(function(error) {
        return res.status(400).json({ 'error': error + ' Echec vérification utilisateur' });
    });
});

router.post('/new', upload.single('image'), (req, res) => {
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Utilisateur.findOne({
        where: { id: userId }
    }).then(function(unserFound) {
        if(unserFound) {
            models.Animal.create({
                nom: req.body.nom,
                dateNaissance: req.body.dateNaissance,
                userId: unserFound.id,
                espece: req.body.espece,
                genre: req.body.genre,
                race: req.body.race,
                image: req.file
            }).then(function (newAnimal) {
                return res.status(201).json(newAnimal.nom);
            }).catch(function (error) {
                return res.status(500).json(({ 'error': error + ' Echec ajout nouvel animal' }));
            });
        } else {
            return res.status(404).json({ 'Error': 'Utilisateur non trouvé dans la base de données'});
        }
    }).catch(function(error){
        return res.status(404).json({ 'Error': 'Vérification utilisateur impossible'}); 
    });
});

router.patch('/updateAnimal/:animalId', (req, res, next) => {
    res.status(200).json({
        message: 'Animal mis à jour'
    })
});

router.delete('/deleteAnimal/:animalId',(reqs, res, next) => {
    res.status(200).json({
        message: 'Animal supprimé'
    });
});

module.exports = router;