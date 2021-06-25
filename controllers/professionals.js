const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

exports.professionals_create = async (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    try {
        const professional = await models.Professional.create({
            nom: req.body.nom,
            email: req.body.email,
            telephone: req.body.telephone,
            adresse: req.body.adresse,
            codePostal: req.body.codePostal,
            userID: userID,
            professionalCategoryID: req.body.professionalCategoryID
        });
        return res.status(200).json(professional);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.professionals_get_all_by_user = async (req, res) => {

    let headerAuth = req.headers['authorization'];
    let pUserId = jwtUtils.getUserId(headerAuth);

    if (pUserId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    try {
        const professionals = await models.Professional.findAll({
            where: { userId: pUserId }
        });
        return res.status(200).json(professionals);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.professionals_get_all_by_category = async (req, res) => {

    let headerAuth = req.headers['authorization'];
    let pUserId = jwtUtils.getUserId(headerAuth);

    if (pUserId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    } 

    try {
        const professionals = await models.Professional.findAll({
            where: { categorieProId: req.params.idCategorieProParam },
            include: [{
                model: models.ProfessionalCategory,
                attributes: ['libelle'],
                as: 'professionalCategory'
            }]
        });
        return res.status(200).json(professionals);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.professionals_get_professional = async (req, res) => {

    let headerAuth = req.headers['authorization'];
    let pUserId = jwtUtils.getUserId(headerAuth);

    if (pUserId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    } 

    try {
        const professionalFound = await models.Professional.findOne({
            where: { id: req.params.idProfessional }
        });
        return res.status(200).json(professionalFound);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.professionals_update_professional = async (req, res) => {

    let headerAuth = req.headers['authorization'];
    let pUserId = jwtUtils.getUserId(headerAuth);

    if (pUserId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }
    
    let pIdPro = req.params.idProfessional;
    let pNom = req.body.nom;
    let pEmail = req.body.email;
    let pTelephone = req.body.telephone;
    let pAdresse = req.body.adresse;
    let pCodePostal = req.body.codePostal;
    let pProfessionalCetegoryID = req.body.professionalCategoryID;

    try {
        const professionalFound = await models.Professionnel.findOne({
            where: { id: pIdPro }
        });

        try {
            const professionalUpdated = await professionalFound.update({
                nom: (pNom ? pNom : professionalFound.nom),
                email: (pEmail ? pEmail : professionalFound.email),
                telephone: (pTelephone ? pTelephone : professionalFound.telephone),
                adresse: (pAdresse ? pAdresse : professionalFound.adress),
                codePostal: (pCodePostal ? pCodePostal : professionalFound.codePostal),
                professionalCategoryID: (pProfessionalCetegoryID ? pProfessionalCetegoryID : professionalFound.professionalCategoryID)
            });
            return res.status(200).json(professionalUpdated);
        } catch (e) {
            return res.status(400).json({ 'status': 400, message: e.message });
        }
    } catch(e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.professionals_delete_professional = async (req, res) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (pUserId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    } 

    try {
        const professionalFound = await models.Professionnel.findOne({
            where: { id: req.params.idProfessional }
        });
            try {
                const professionalDeleted = await models.Professional.destroy({
                    where: { id: professionalFound.id }
                });
                return res.status(200).json(professionalDeleted);
            } catch (e) {
                return res.status(400).json({ 'status': 400, message: e.message });
            }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}