// Imports
const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/new', (req, res) => {
    // Params
    var pDateVermifuge = req.body.dateVermifuge;
    var pDateProchainVermifuge = req.body.dateProchainVermifuge;
    var pAnimalId = req.body.animalId;
    var pStaut = req.body.statut;

    models.Vermifuge.create({
        dateVermifuge: pDateVermifuge,
        dateProchainVermifuge: pDateProchainVermifuge,
        animalId: pAnimalId,
        statut: pStaut
    }).then(function (vermifugeCreated) {
        if (vermifugeCreated) {
            return res.status(200).json(vermifugeCreated);
        } else {
            return res.status(400).json({ 'Error ': 'Le traitement vermifuge n\'a pas été crée' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Impossible de créer le traitement vermifuge' });
    });
});

router.get('/:idVermifuge', (req, res) => {
    //Param
    var pIdVermifuge = req.params.idVermifuge;

    models.Vermifuge.findOne({
        where: { id: pIdVermifuge }
    }).then(function (vermifugeFound) {
        if (vermifugeFound) {
            return res.status(200).json(vermifugeFound);
        } else {
            return res.status(400).json({ 'Error ': 'Le traitement vermifuge demandé n\'est pas dans la base de données' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Recherche du traitement vermifuge impossible' });
    });
});



router.patch('/:idVermifuge', (req, res) => {
    // Param
    var pIdVermifuge = req.params.idVermifuge;
    var pDateVermifuge = req.body.dateVermifuge;
    var pDateProchainVermifuge = req.body.dateProchainVermifuge;
    var pStatut = req.body.statut;

    models.Vermifuge.findOne({
        where: { id: pIdVermifuge }
    }).then(function (vermifugeFound) {
        if (vermifugeFound) {
            vermifugeFound.update({
            }).then(function (vermifugeUpdated) {
                if (vermifugeUpdated) {
                    return res.status(200).json(vermifugeUpdated);
                } else {
                    return res.statusk(400).json({ 'Error ': 'Le traitment vermifuge n\'a pas été mis à jour' });
                }        
            }).catch(function (error) {
                return res.status(500).json({ 'Error ': error + ' Modification du traitement vermifuge impossible' });
            })
        } else {
            return res.status(400).json({ 'Error ': 'Le traitement vermifuge demandé n\'est pas dans la base de données' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + 'Recherche du traitement vermifuge impossible' });
    })
});

router.delete('/:idVermifuge', (req, res) => {
    // Param
    var pIdVermifuge = req.params.idVermifuge;

    models.Vermifuge.findOne({
        where: { id: pIdVermifuge }
    }).then(function (vermifugeFound) {
        if (vermifugeFound) {
            vermifugeFound.destroy({
            }).then(function (vermifugeDeleted) {
                if (vermifugeDeleted) {
                    return res.status(200).json(vermifugeDeleted);
                } else {
                    return res.status(400).json({ 'Error ': 'Le traitement vermifuge n\'a pas été supprimé' });
                }
            }).catch(function (error) {
                return res.status(500).json({ 'Error ': error + ' Le traitement vermifuge n\'a pas été supprimé' });
            });
        } else {
            return res.status(400).json({ 'Error ': 'Le traitement vermifuge demandé n\'est pas dans la base de données' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' recherche du traitement vermifuge impossible' });
    });
});


module.exports = router;