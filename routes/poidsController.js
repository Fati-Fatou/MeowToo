// Imports
const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/new/:idAnimal', (req, res) => {
    // Params
    var poids = req.body.poids;
    var datePesee = req.body.datePesee;
    var idAnimalParam = req.params.idAnimal;

    models.Poids.create({
        idAnimal: idAnimalParam,
        poids: poids,
        datePesee: datePesee
    }).then(function (newPoids) {
        if (newPoids) {
            return res.status(200).json(newPoids);
        } else {
            return res.status(400).json({ 'Error': ' L\'ajout du nouveau poids n\'a pas été prise en compte' });
        }
    }).catch(function (error) {
        return res.status(500).status({ 'Error': error + ' Création nouveau poids impossible' });
    });
});

router.get('/:idAnimal', (req, res) => {
    //Param
    var animalId = req.params.idAnimal;

    models.Poids.findAll({
        include: [{
            model: models.Animal,
            attributes: ['id'],
            as: 'animal',
            where: {
                id: animalId
            }
        }]
    });

});

router.get('/:idPoids', (req, res) => {
    // Param
    var idPoidsParam = req.params.idPoids;

    models.Poids.findOne({
        where: { id: idPoidsParam }
    }).then(function (poidsFound) {
        return res.status(200).json(poidsFound);
    }).catch(function (error) {
        return res.status(400).json({ 'Error': error + ' Poids non trouvé' });
    });
});

router.patch('/:idPoids', (req, res) => {
    // Param
    var idPoidsParam = req.params.idPoids;

    models.Poids.update({
        // TODO PARAMS
        where: { id: idPoidsParam }
    }).then(function (poidsUpdated) {
        if (poidsUpdated) {
            return res.status(200).json(poidsUpdated);
        } else {
            return res.status(400).json({ 'Error': ' Poids non mis à jour' });
        }
    }).catch(function (error) {
        return res.status(400).json({ 'Error': error + ' poids pour mise à jour non trouvé' });
    });
});

router.delete('/:idPoids', (req, res) => {
    // Param
    var idPoidsParam = req.params.idPoids;

    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Poids.delete({
        where: { id: idPoidsParam }
    }).then(function(animalDeleted) {
        if(animalDeleted) {
            return res.status(200).json(animalDeleted);
        } else {
            return res.status(400).json({ 'Error': error + ' Suppression du poids impossible'});
        }  
    }).catch(function(error) {
        return res.status(400).json({ 'Error': error + ' Poids à supprimer non trouvé dans la base de données'});
    });

});

module.exports = router;