// Imports
const express = require('express');
const router = express.Router();
const models = require('../models');


router.post('/new', (req, res) => {
    // Params
    var pMedicamentId = req.body.medicamentId;
    var pDatHeureRappel = req.body.dateHeureRappel;
    var pStatut = req.body.statut;

    models.Event.create({
        medicamentId: pMedicamentId,
        dateHeureRappel: pDatHeureRappel,
        statut: pStatut
    }).then(function (eventCreated) {
        if (eventCreated) {
            return res.status(200).json(eventCreated);
        } else {
            return res.status(400).json({ 'Error ' : 'Le nouvel évènement n\'a pas été créé.' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Impossible de créer un nouvel évènement.' });
    });
});

router.get('/:idMedicament', (req, res) => {
    // Param
    var pMedicamentId = req.params.idMedicament;

    models.Event.findOne({
        where: { id: pMedicamentId }
    }).then(function (eventFound) {
        if (eventFound) {
            return res.status(200).json(eventFound);
        } else {
            return res.status(400).json({ 'Error ' : 'L\'évènement demandé n\'est pas dans la base de données.' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ' : error + ' Impossible de récupérer l\'évènement demandé' });
    });
});

router.patch('/:idEvent', (req, res) => {
    // Param
    var pIdEvent = req.params.idEvent;
    var pMedicamentId = req.body.medicamentId;
    var pDatHeureRappel = req.body.dateHeureRappel;
    var pStatut = req.body.statut;

    models.Event.findOne({
        where: { id: pIdEvent }
    }).then(function (eventFound) {
        if (eventFound) {
             eventFound.update({
                medicamentId: (pMedicamentId ? pMedicamentId : eventFound.medicamentId),
                dateHeureRappel: (pDatHeureRappel ? pDatHeureRappel : eventFound.dateHeureRappel),
                statut: (pStatut ? pStatut : eventFound.statut)
             }).then(function (eventUpdated) {
                return res.status(200).json(eventUpdated);
             }).catch(function (error) {
                return res.status(500).json({ 'Error ': error + ' Mis à jour de l\'évènement impossible.' });
             });
        } else {
            return res.status(400).json({ 'Error ': ' L\'évènement n\'est pas dans la base de données.' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Recherche de l\'évènement impossible.' });
    });
});

router.delete('/:idEvent', (req, res) => {
    // Param
    var pIdEvent = req.params.idEvent;

    models.Event.findOne({
        where: { id: pIdEvent }
    }).then(function (eventFound) {
        if (eventFound) {
             eventFound.destroy({
             }).then(function (eventDeletd) {
                return res.status(200).json(eventDeletd);
             }).catch(function (error) {
                return res.status(500).json({ 'Error ': error + ' Suppression de l\'évènement impossible.' });
             })
        } else {
            return res.status(400).json({ 'Error ': ' L\'évènement n\'est pas dans la base de données.' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Recherche de l\'évènement impossible.' });
    });
    
});


module.exports = router;