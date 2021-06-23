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

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    } 

    let idTreatment = req.params.idTreatment;
    let medication = req.body.medication;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let timesPerDay = req.body.timesPerDay;
    let statut = req.body.status;

    try {
        const treatmentFound = await models.Treatment.findOne({
            where: { id: idTreatment }
        });

        try {
            const treatmentUpdated = await models.Treatment.update({
                medication: (medication ? medication : treatmentFound.medicamentId),
                startDate: (startDate ? startDate : treatmentFound.startDate),
                endDate: (endDate ? endDate : treatmentFound.endDate),
                timesPerDay: (timesPerDay ? timesPerDay : treatmentFound.endDate),
                statut: (statut ? statut : treatmentFound.statut)
             });
             return res.status(200).json(treatmentUpdated);
        } catch (e) {
            return res.status(400).json({ 'status': 400, message: e.message });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.treatments_delete_treatment = async  (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    } 

    try {
        const treatmentFound = await   models.Treatment.findOne({
            where: { id: req.params.idTreatment }
        });
        try {
            const treatmentDeleted = models.Treatment.destroy({
                where : {id: treatmentFound.id}
            });
            return res.status(200).json(treatmentDeleted);
        } catch (e) {
            return res.status(400).json({ 'status': 400, message: e.message });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

 