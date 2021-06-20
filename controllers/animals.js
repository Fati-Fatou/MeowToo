const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

exports.animals_create_animal = async (req, res) => {
    // Get Auth Header
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    } 

    try {
        const animalCreated = await models.Animal.create({
            nom: req.body.nom,
            dateNaissance: req.body.dateNaissance,
            utilisateurId: userId,
            espece: req.body.espece,
            genre: req.body.genre,
            race: req.body.race,
            image: req.file
        });
        return res.status(200).json(animalCreated);
    } catch (e){
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.animals_get_all = async (req, res) => {
    // Get Auth Header
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    try {
        const animals = await models.Animal.findAll({
            where: { utilisateurId: userId },
            include: [{
                model: models.Utilisateur,
                attributes: [ 'id', 'nom', 'prenom'],
            }] 
        });
        return res.status(200).json(animals);
    } catch (e){
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.animals_get_animal = async (req, res) => {
    let pIdAnimal = req.params.idAnimal;

    try {
        const animalFound = await models.Animal.findOne({
            where: { id: pIdAnimal },
            include: [{
                model: models.Utilisateur,
                attributes: [ 'id', 'nom', 'prenom'],
            }] 
        });
        return res.status(200).json(animalFound);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.animals_update_animal = async (req, res) => {
    let animalId = req.params.animalId;
    let pNom = req.body.nom;
    let pDateNaissance = req.body.dateNaissance;
    let pEspece = req.body.espece;
    let pGenre = req.body.genre;
    let pRace = req.body.race;
    let pImage = req.file;

    // Get Auth Header
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    try {
        const animalFound = await models.Animal.findOne({
            where: { id: animalId }
        });

        try {
            const animalUpdated = await models.Animal.update({
                nom: (pNom ? pNom : animalFound.nom),
                dateNaissance: (pDateNaissance ? pDateNaissance : animalFound.dateNaissance),
                espece: (pEspece ? pEspece : animalFound.espece),
                genre: (pGenre ? pGenre : animalFound.genre),
                race: (pRace ? pRace : animalFound.race),
                image: (pImage ? pImage : animalFound.image)
            }, {
                where: { id: animalFound.id }
            });
            return res.status(200).json(animalUpdated);
        } catch (e) {
            return res.status(400).json({ 'status': 400, message: e.message });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.animals_delete_animal = async (req, res) => {
    // Param
    let animalId = req.params.animalId;
    // Get Auth Header
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    try {
        const animalFound = await models.Animal.findOne({
            where: { id: animalId }
        });

        try {
            const animalDeleted = await models.Animal.destroy({
                where: { id: animalFound.id }
            });
            return res.status(200).json(animalDeleted);
        } catch (e) {
            return res.status(400).json({ 'status': 400, message: e.message });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}