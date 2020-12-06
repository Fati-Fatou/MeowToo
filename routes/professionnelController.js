// Imports
const express = require('express');
const router = express.Router();
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

router.post('/new', (req, res) => {
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    models.Professionnel.create({
        nom: req.body.nom,
        email: req.body.email,
        telephone: req.body.telephone,
        adresse: req.body.adresse,
        codePostal: req.body.codePostal,
        userId: userId,
        categorieProId: req.body.categorieProId
    }).then(function (newProfessionnel) {
        if (newProfessionnel) {
            return res.status(200).json(newProfessionnel);
        } else {
            return res.status(400).json({ 'Error': ' Le professionnel n\'a pas été créé' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error': error + ' Création d\'un nouveau professionnel impossible' });
    });
});

router.get('/mesProfessionnels', (req, res) => {

    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var pUserId = jwtUtils.getUserId(headerAuth);

    if (pUserId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Professionnel.findAll({
        where: { userId: pUserId }
    }).then(function (professionnnelsFound) {
        if (professionnnelsFound) {
            return res.status(200).json(professionnnelsFound);
        } else {
            return res.status(400).json({ 'Error': ' Professionnels non présents dans la base de données' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error': error + ' Récupérations des professionnels impossible' });
    });
});

router.get('/categoriePro/:idCategorieProParam', (req, res) => {
    // Param
    var pCategoriePro = req.params.idCategorieProParam;
    // TODO check fk
    models.Professionnel.findAll({
        where: { categorieProId: pCategoriePro }
    }).then(function (professionnnelsFound) {
        if (professionnnelsFound) {
            return res.status(200).json(professionnnelsFound);
        } else {
            return res.status(400).json({ 'Error': ' Professionnels non présents dans la base de données' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error': error + ' Récupérations des professionnels impossible' });
    });
});

router.get('/:idProParam', (req, res) => {

    models.Professionnel.findOne({
        where: { id: req.params.idProParam }
    }).then(function (professionnelFound) {
        if (professionnelFound) {
            return res.status(200).json(professionnelFound);
        } else {
            return res.status(400).json({ 'Error': ' Professionnel absent de la base de données' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error': error + ' Récupération professionnel impossible' });
    });
});

router.patch('/:idProParam', (req, res) => {
    // Param
    var pIdPro = req.params.idProParam;
    var pNom = req.body.nom;
    var pEmail = req.body.email;
    var pTelephone = req.body.telephone;
    var pAdresse = req.body.adress;
    var pCategoriePro = req.body.categorieProId;

    models.Professionnel.findOne({
        where: { id: pIdPro }
    }).then(function (professionnelFound) {
        if (professionnelFound) {
            professionnelFound.update({
                nom: (pNom ? pNom : professionnelFound.nom),
                email: (pEmail ? pEmail : professionnelFound.email),
                telephone: (pTelephone ? pTelephone : professionnelFound.telephone),
                adress: (pAdresse ? pAdresse : professionnelFound.adress),
                categorieProId: (pCategoriePro ? pCategoriePro : professionnelFound.categorieProId)
            }).then(function (professionnelUpdated) {
                if (professionnelUpdated) {
                    return res.status(200).json(professionnelUpdated);
                } else {
                    return res.status(400).json({ 'Error': 'Professionnel n\'a pas été mis à jour' });
                }
            }).catch(function (error) {
                return res.status(400).json({ 'Error ': error + ' Mise à jour du professionel impossible' });
            });
        } else {
            return res.status(400).json({ 'Error': ' Le professionnel n\'est pas dans la base de données' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Récupération du professionnel impossible' });
    });
});

router.delete('/:idProParam', (req, res) => {
    // Param
    var idProParam = req.params.idProParam;

    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Utilisateur.findOne({
        where: { id: userId }
    }).then(function (userFound) {

        if (userFound || userFound.isAdmin == true) {

            models.Professionnel.destroy({
                where: { id: idProParam }
            }).then(function (professionnelDeleted) {
                if (professionnelDeleted) {
                    return res.status(200).json(professionnelDeleted);
                } else {
                    return res.status(400).json({ 'Error': ' Le professionnel n\'a pas été supprimé' });
                }

            }).catch(function (error) {
                return res.status(500).json({ 'Error ': error + ' Supression du professionnel impossible' });
            });
        } else {
            return res.status(400).json({ 'Error': ' Utilisateur non trouvé ou non admin' });
        }
    }).catch(function (error) {
        return res.status(400).json({ 'Error ': error + ' Vérification utilisateur impossible' });
    });

});

module.exports = router;