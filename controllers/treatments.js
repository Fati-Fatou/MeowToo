const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

exports.treatments_create = async (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    } 

    let pMedicamentId = req.body.medicamentId;
    let pDatHeureRappel = req.body.dateHeureRappel;
    let pStatut = req.body.statut;

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
}

exports.treatments_get_all_By_Animal = async (req, res) => {
    
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    } 

    try {
        const treatments = await models.Event.findAll({
            where: { animalId: req.params.idAnimal }
        });
        return res.status(200).json(treatments);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.treatments_get_treatment = async (req, res) => {
    
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    } 

    try {
        const treatment = await models.Event.findOne({
            where: { id: req.params.idTreatment }
        });
        return res.status(200).json(treatment);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.treatments_update_treatment = async (req, res) => {

    // TODO : change attributs
    let idTreatment = req.params.idTreatment;
    let pMedicamentId = req.body.medicamentId;
    let pDatHeureRappel = req.body.dateHeureRappel;
    let pStatut = req.body.statut;

    models.Event.findOne({
        where: { id: idTreatment }
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
}

exports.treatments_delete_treatment = async  (req, res) => {

    let idTreatment = req.params.idTreatment;

    models.Event.findOne({
        where: { id: idTreatment }
    }).then(function (eventFound) {
        if (eventFound) {
             eventFound.destroy({
             }).then(function (eventDeletd) {
                return res.status(200).json(eventDeletd);
             }).catch(function (error) {
                return res.status(500).json({ 'Error ': error + ' Suppression de l\'évènement impossible.' });
             })
        } else {
            return res.status(404).json({ 'Error ': ' L\'évènement n\'est pas dans la base de données.' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Recherche de l\'évènement impossible.' });
    });
}

