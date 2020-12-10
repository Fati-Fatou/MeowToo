// Imports
const express = require('express');
const router = express.Router();
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');


router.get('/monAnimal/:idAnimal', (req, res) => {
    // Param
    var pIdAnimal = req.params.idAnimal;

    models.RendezVous.findAll({
        where: { animalId: pIdAnimal }
    }).then(function (rendezVousFound) {
        if (rendezVousFound) {
            return res.status(200).json(rendezVousFound);
        } else {
            return res.status(400).json({ 'Error': ' Le rendez-vous n\'est pas dans la base de données' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + 'Impossible de récupréer le rendez-vous' });
    });
});

router.get('/mesRendezVous', (req, res) => {
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var pUserId = jwtUtils.getUserId(headerAuth);

    models.RendezVous.findAll({
        where: { userId: pUserId }
    }).then(function (rendezVousFound) {
        if (rendezVousFound) {
            return res.status(200).json(rendezVousFound);
        } else {
            return res.status(400).json({ 'Error': ' Les rendez-vous ne sont pas dans la base de données' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + 'Impossible de récupréer vos rendez-vous' });
    });
});

router.get('/monRendezVous/:idRendezVous', (req, res) => {
    // Param
    var pIdRendezVous = req.params.idRendezVous;

    models.RendezVous.findOne({
        where: { id: pIdRendezVous }
    }).then(function (rendezVousFound) {
        if (rendezVousFound) {
            return res.status(200).json({ rendezVousFound });
        } else {
            return res.status(400).json({ 'Error': ' Le rendez-vous n\'est pas en base de données' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': + error + ' Recherche rendez-vous impossible ' });
    });
});

router.post('/new', (req, res) => {
    // Param
    var pDateRDV = req.body.dateRendezVous;
    var pAnimalId = req.body.animalId;
    var pProfessionnelId = req.body.professionnelId;
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var pUserId = jwtUtils.getUserId(headerAuth);

    models.RendezVous.create({
        dateRendezVous: pDateRDV,
        animalId: pAnimalId,
        professionnelId: pProfessionnelId,
        userId: pUserId
    }).then(function (newRDV) {
        if (newRDV) {
            return res.status(200).json(newRDV);
        } else {
            return res.status(400).json({ 'Error': ' Erreur lors de la création du rendez-vous' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Création nouveau renez-vous impossible' });
    });
});

router.patch('/:idRendezVous', (req, res) => {
    // Params
    var pIdRDV = req.params.idRendezVous;
    var pDateRDV = req.body.dateRendezVous;
    var pAnimalId = req.body.animalId;
    var pProfessionnelId = req.body.professionnelID;

    models.RendezVous.findOne({
        where: { id: pIdRDV }
    }).then(function (rendezVousFound) {
        if (rendezVousFound) {
            rendezVousFound.update({
                dateRendezVous: (pDateRDV ? pDateRDV : rendezVousFound.dateRendezVous),
                animalId: (pAnimalId ? pAnimalId : rendezVousFound.animalId),
                professionnelId: (pProfessionnelId ? pProfessionnelId : rendezVousFound.professionnelId)
            }).then(function (rdvUpdated) {
                if (rdvUpdated) {
                    return res.status(200).json(rdvUpdated);
                } else {
                    return res.status(400).json({ 'Error': ' Le rendez-vous n\'a pas été mis à jour' });
                }
            }).catch(function (error) {
                return res.status(500).json({ 'Error': error + ' Mise à jour du rendez-vous impossible' });
            });
        } else {
            return res.status(400).json({ 'Error': ' Le rendez-vous n\'est pas dans la base de données' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Recherhce du rendez-vous impossible' });
    })
});

router.delete('/:idRendezVous', (req, res) => {
    // Param
    var pIdRDV = req.params.idRendezVous;

    models.RendezVous.findOne({
        where: { id: pIdRDV }
    }).then(function (rendezVousFound) {
        if (rendezVousFound) {
            models.RendezVous.destroy({
                where: { id: rendezVousFound.id }
            }).then(function (rdvDeleted) {
                return res.status(200).json({ rdvDeleted });
            }).catch(function (error) {
                return res.status(400).json({ 'Error ': error + ' Le rendez-vous n\'a pas été supprimé' });
            });
        } else {
            return res.status(400).json({ 'Error': ' Le rendez-vous n\'est pas dans la base de données' });
        }

    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Suppression du rendez-vous impossible' });
    });

});

module.exports = router;