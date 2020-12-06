// Imports
const express = require('express');
const router = express.Router();
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');


router.get('/:idTraitement', (req, res) => {
    // Param
    var pITraitement = req.params.idTraitement;

    models.RappelTraitement.findOne({
        include: [{
            model: models.Traitement,
            attributes: ['id'],
            as: 'traitement',
            where: {
                id: pITraitement
            }
        }]
    }).then(function (rappelTraitementFound) {
        return res.status(200).json(rappelTraitementFound);
    }).catch(function (error) {
        return res.status(400).json({ 'Error ': error + ' Il n\'y a pas de rappel pour ce traitement' });
    });
});

router.post('/', (req, res) => {
    // Params
    var pTraitementId = req.body.traitementId;
    var pDateRappel = req.body.dateRappel;

    models.RappelTraitement.create({
        traitementId: pTraitementId,
        dateRappel: pDateRappel
    }).then(function (rappelCreated) {
        return res.status(200).json({ rappelCreated });
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' La création du rappel impossible' });
    });
});

router.update('/:idRappelTraitement', (req, res) => {
    // Param
    var pIdRappelTraitment = req.params.idRappelTraitement;
    var pDateRappel = req.body.dateRappel;

    models.RappelTraitement.findOne({
        where: { id: pIdRappelTraitment }
    }).then(function (rappelFound) {
        if (rappelFound) {
            models.RappelTraitement.update({
                dateRappel: (pDateRappel ? dateRappel : rappelFound.dateRappel)
            }).then(function (rappelTraitementUpdated) {
                return res.status(200).json(rappelTraitementUpdated);
            }).catch(function (error) {
                return res.status(500).json({ 'Error ': error + ' Mise à jour du rappel traitement impossible' });
            });
        } else {
            return res.status(400).json({ 'Error': ' Le rappel du traitment n\'est pas dans la base de données' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Récupération du rappel du traitement impossible' });
    })

});

router.delete('/:idRappelTraitement', (req, res) => {
    // Param
    var pIdRappelTraitment = req.params.idRappelTraitement;

    models.RappelTraitement.findOne({
        where: { id: pIdRappelTraitment }
    }).then(function(rappelTraitementUpdated) {
        if (rappelTraitementFound) {
            models.RappelTraitement.destroy({
                where: { id: rappelTraitementFound.id }
            }).then(function (rappelDeleted) {
                return res.status(200).json({rappelDeleted});
            }).catch(function (error) {
                return res.status(400).json({ 'Error': ' Le rappel du traitment n\'a pas été supprimé' });
            });
        } else {
            return res.status(400).json({ 'Error': ' Le rappel du traitment n\'est pas dans la base de données' });
        }
    }).catch(function(error) {
        return res.status(500).json({ 'Error ': error + ' Récupération du rappel du traitement impossible' });
    })
});

module.exports = router;