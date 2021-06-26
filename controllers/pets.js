const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

exports.pets_create_pet = async (req, res) => {
    // Get Auth Header
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    } 

    try {
        const petCreated = await models.pet.create({
            nom: req.body.nom,
            dateNaissance: req.body.dateNaissance,
            utilisateurId: userId,
            espece: req.body.espece,
            genre: req.body.genre,
            race: req.body.race,
            image: req.file
        });
        return res.status(200).json(petCreated);
    } catch (e){
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.pets_get_all = async (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    try {
        const pets = await models.pet.findAll({
            where: { utilisateurId: userId },
            include: [{
                model: models.Utilisateur,
                attributes: [ 'id', 'nom', 'prenom'],
            }] 
        });
        return res.status(200).json(pets);
    } catch (e){
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.pets_get_pet = async (req, res) => {
    let pIdPet = req.params.idPet;

    try {
        const petFound = await models.pet.findOne({
            where: { id: pIdPet },
            include: [{
                model: models.Utilisateur,
                attributes: [ 'id', 'nom', 'prenom'],
            }] 
        });
        return res.status(200).json(petFound);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.pets_update_pet = async (req, res) => {
    let idPet = req.params.idPet;
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
        const petFound = await models.pet.findOne({
            where: { id: idPet }
        });

        try {
            const petUpdated = await models.pet.update({
                nom: (pNom ? pNom : petFound.nom),
                dateNaissance: (pDateNaissance ? pDateNaissance : petFound.dateNaissance),
                espece: (pEspece ? pEspece : petFound.espece),
                genre: (pGenre ? pGenre : petFound.genre),
                race: (pRace ? pRace : petFound.race),
                image: (pImage ? pImage : petFound.image)
            }, {
                where: { id: petFound.id }
            });
            return res.status(200).json(petUpdated);
        } catch (e) {
            return res.status(400).json({ 'status': 400, message: e.message });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.pets_delete_pet = async (req, res) => {
    // Param
    let idPet = req.params.idPet;
    // Get Auth Header
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    try {
        const petFound = await models.pet.findOne({
            where: { id: idPet }
        });

        try {
            const petDeleted = await models.pet.destroy({
                where: { id: petFound.id }
            });
            return res.status(200).json(petDeleted);
        } catch (e) {
            return res.status(400).json({ 'status': 400, message: e.message });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}