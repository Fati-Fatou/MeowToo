// Imports
const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/new', (req, res) => {
    // Params
    var pDateVaccin = req.body.dateVaccin;
    var pDatedProchainVaccin = req.body.dateProchainVaccin;
    var pAnimalId = req.body.animalId;
    var pStatut = req.body.statut;

    models.Vaccin.create({
        dateVaccin = pDateVaccin,
        dateProchainVaccin = pDatedProchainVaccin,
        animalId = pAnimalId,
        statut = pStatut
    }).then(function (vaccinCreated) {
        if(vaccinCreated) {
            return res.status(200).json(vaccinCreated);
        } else {
            return res.status(400).json({ 'Error': ' Le vaccin n\'a pas pu être crée '});
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ' : error});
    });
});

router.get('/:idAnimal', (req, res) => {
    // Param
    var pAnimalId = req.params.idAnimal;

    models.Vaccin.findAll({
        where: { animalId: pAnimalId, status: 0 }
    }).then(function (vaccinFound) {
        if (vaccinFound) {
            return res.status(200).json(vaccinFound);
        } else {
            return res.status(400).json({ 'Error': ' Le vaccin n\'est pas dans la base de données '});
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Recherche du vaccin impossible' });
    });
});


router.patch('/:idVaccin', (req, res) => {
    // Params
    var pIdVaccin = req.params.idVaccin;
    var pDateVaccin = req.body.dateVaccin;
    var pDateProchainVaccin = req.body.dateProchainVaccin;
    var pAnimalId = req.body.animalId;
    var pStatut = req.body.animalId;

    models.Vaccin.findOne({
        where: { id: pIdVaccin}
    }).then(function (vaccinFound) {
        if (vaccinFound) {
            models.vaccinFound.update({
                dateVaccin: (pDateVaccin ? pDateVaccin : vaccinFound.dateVaccin),
                dateProchainVaccin: (pDateProchainVaccin ? pDateProchainVaccin : vaccinFound.dateProchainVaccin),
                animalId: (pAnimalId ? pAnimalId : vaccinFound.animalId),
                statut: (pStatut ? pStatut : vaccinFound.statut)
            }).then(function (vaccinUpdated) {
                if (vaccinUpdated) {
                    return res.status(200).json(vaccinUpdated);
                } else {
                    return res.status(400).json({ 'Error': ' Le vaccin n\'a pas été mis à jour' });
                }
            }).catch(function (error) {
                return res.status(500).json({ 'Error': error + ' Mise à jour du vaccin impossible ' });
            });
        } else {
            return res.status(400).status({ 'Error': 'Le vaccin n\'est pas dans la base de données '});
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error': error + ' Recherche du vaccin impossible ' });
    });
});

router.delete('/:idVaccin', (req, res) => {
    // Param
    var pIdVaccin = req.params.idVaccin;

    models.Vaccin.findOne({
        where: { id: pIdVaccin }
    }).then(function (vaccinFound) {
        if (vaccinFound) {
            vaccinFound.destroy({
            }).then(function (vaccinDeleted) {
                return res.status(200).json({vaccinDeleted});
            }).catch(function (error) {
                return res.status(500).json({ 'Error ' : error + ' Suppression du vaccin impossible'})
            });
        } else {
            return res.status(400).json({ 'Error': ' Le vaccin n\'est pas dans la base de doonées' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error': ' Recherche du vaccin impossible' });
    });
});

module.exports = router;