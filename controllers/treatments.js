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

    let pMedicamentId = req.params.idAnimal;

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
}