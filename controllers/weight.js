const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

exports.weight_create = async (req, res) => {  

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    } 

    try {
        const weightCreated = await models.Poids.create({
            animalId: req.params.idAnimal,
            weight: req.body.weight,
            weighingDate: req.body.weighingDate
        });
        return res.status(200).json(weightCreated);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.weight_get_all_by_animal = async (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    } 

    try {
        const weighings = await models.Poids.findAll({
            where: { animalId: req.params.idAnimal }
        });
        return res.status(200).json(weighings);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.weight_get_weight = async (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    } 

    try {
        const weightFound = await     models.Poids.findOne({
            where: { id: req.params.idWeight }
        });
        return res.status(200).json(weightFound);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.weight_update_weight = async (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    } 

    let idWeight = req.params.idWeight;
    let weight = req.body.weight;
    let weighingDate = req.body.weighingDate;

    try {
        const weightToUpdate = await models.Poids.findOne({
            where: { id: idWeight }
        });

        try {
            const weightUpdated = await weightToUpdate.update({
                poids: (weight ? weight : weightToUpdate.weight),
                datePesee: (weighingDate ? weighingDate : weightToUpdate.weighingDate)
            });
            return res.status(200).json(weightUpdated);
        } catch (e) {
            return res.status(400).json({ 'status': 400, message: e.message });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.weight_delete_weight = async (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    } 

    try {
        const weightToDelete = await models.Poids.findOne({
            where: { id: idWeight }
        });
        try {
           const weightDeleted = await weightToDelete.destroy({
                where: { id: req.params.idWeight }
            });
            return res.status(200).json(weightDeleted);
        } catch (e) {
            return res.status(400).json({ 'status': 400, message: e.message });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}