// Imports
const express = require('express');
const router = express.Router();
const models = require('../models');


router.post('/new', (req, res) => {
    // TODO Vérifier si id animal dans requête ou à passer en params
    models.Traitement.create({
        animalId: req.body.animalId,
        libelle: req.body.libelle,
        rappel: req.body.rappel
    }).then(function(newTraitement) {
        if(newTraitement) {
            return res.status(200).json(newTraitement);
        } else {
            return res.status(400).json({ 'Error': ' Le nouveau traitement n\'a pas été créé' });
        }
    }).catch(function(error) {
        return res.status(500).json({ 'Error ': error + ' Création nouveau traitement impossible' });
    });
});

router.get('/:idTraitement', (req, res) => {
    // Param
    var idTraitementParam = req.params.idTraitement;

    models.Traitement.findOne({
        where: { id: idTraitementParam}
    }).then(function(traitementFound) {
        if (traitementFound) {
            return res.status(200).json(traitementFound);
        } else {
            return res.status(400).json({ 'Error': ' Le traitment n\'est pas dans la base de données' });
        }
    }).create(function(error) {
        return res.status(500).json({ 'Error ': error + ' Récupération du Traitement impossible'})
    });
});

router.get('/:idAnimal', (req, res) => {
    // Params
    var idAnimalParam = req.params.idAnimal;

    models.Traitement.findAll({
        include: [{
            model: models.Animal,
            attribtes: ['id'],
            as: 'animal',
            where: {
                id: idAnimalParam
            }
        }]
    }).then(function(traitementsFound) {
        if(traitementsFound) {
            return res.status(200).json(traitementsFound);
        } else {
            return res.status(400).json({ 'Error': ' Il n\'y a pas de Traitements dans la base de données' });
        }
    }).catch(function(error) {
        return res.status(500).json({ 'Error ': error + ' Récupération des traitements impossible' });
    });
});

router.put('/:idTraitement', (req, res) => {
    // Param
    var idTraitementParam = req.params.idTraitement;
    var libelleP = req.body.libelle;
    var rappelP = req.body.rappel;

    models.Traitment.findOne({
        where: { id: idTraitementParam }
    }).then(function(traitementFound) {
        if(traitementFound) {
            traitementFound.update({
                libelle: (libelle ? libelleP : traitementFound.libelle),
                rappel: (rappel ? rappelP : traitementFound.rappel)
            }).then(function(traitementUpdated) {
                return res.status(200).json(traitementUpdated);
            }).catch(function(error) {
                return res.status(400).json({ 'Error ': error + ' Le traitment n\'a pas été mis à jour' });
            });
        } else {
            return res.status(400).json({ 'Error': ' le Traitment non trouvé dans la base de doonnées' });
        }
    }).catch(function(error) {
            return res.status(500).json({ 'Error': ' la recherche du traitment n\'a pas pu être effectuée' });
    });
});

router.delete('/:idTraitement', (req, res) => {

});

module.exports = router;