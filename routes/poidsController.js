// Imports
const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/new/:idAnimal', (req, res) => {
    // Params
    var pPoids = req.body.poids;
    var pDatePesee = req.body.datePesee;
    var pIdAnimalParam = req.params.idAnimal;

    models.Poids.create({
        animalId: pIdAnimalParam,
        poids: pPoids,
        datePesee: pDatePesee
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

router.get('/animal/:idAnimal', (req, res) => {
    //Param
    var pAnimalId = req.params.idAnimal;

    models.Poids.findAll({
        where: { animalId: pAnimalId }
    }).then(function (poidsFound) {
        if (poidsFound) {
            return res.status(200).json(poidsFound);
        } else {
            return res.status(400).json({ 'Error': ' Les pesées ne sont pas en base de données pour cet animal' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error': ' Récupération des pesées pour cet animal impossible' });
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
    var pPoids = req.body.poids;
    var pdatePesee = req.body.datePesee;

    models.Poids.findOne({
        where: { id: idPoidsParam }
    }).then(function (poidsFound) {
        if (poidsFound) {
            poidsFound.update({
                poids: (pPoids ? pPoids : poidsFound.poids),
                datePesee: (pdatePesee ? pdatePesee : poidsFound.datePesee)
            }).then(function (poidsUpdated) {
                if (poidsUpdated) {
                    return res.status(200).json(poidsUpdated);
                } else {
                    return res.status(400).json({ 'Error': ' Poids non mis à jour' });
                }
            }).catch(function (error) {
                return res.status(400).json({ 'Error': error + ' poids pour mise à jour non trouvé' });
            });
        } else {
            return res.status(400).json({ 'Error': ' Le poids à modifier n\'est pas dans la base de données' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Récupération du poids impossible' });
    });
});

router.delete('/:idPoids', (req, res) => {
    // Param
    var idPoidsParam = req.params.idPoids;

    models.Poids.destroy({
        where: { id: idPoidsParam }
    }).then(function (animalDeleted) {
        if (animalDeleted) {
            return res.status(200).json(animalDeleted);
        } else {
            return res.status(400).json({ 'Error': error + ' Suppression du poids impossible' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error': error + ' Poids à supprimer non trouvé dans la base de données' });
    });
});

module.exports = router;