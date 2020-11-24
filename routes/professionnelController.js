// Imports
const express = require('express');
const router = express.Router();
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

router.post('/new', (req, res) => {

    models.Professionnel.create({
        nom: req.body.nom,
        email: req.body.email,
        telephone: req.body.telephone,
        adress: req.body.adress,
        categorieProId: req.body.categorieProId // TODO vérifier si param ou dans requête
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

router.get('/', (req, res) => {

    models.Professionnel.findAll()
        .then(function (professionnnelsFound) {
            if (professionnnelsFound) {
                return res.status(200).status(professionnnelsFound);
            } else {
                return res.status(400).json({ 'Error': ' Professionnels non présents dans la base de données' });
            }
        }).catch(function (error) {
            return res.status(500).json({ 'Error': error + ' Récupérations des professionnels impossible' });
        });
});

router.get('/:idCategorieProParam', (req, res) => {
    // Param
    var idCategorieProParam = req.params.idCategorieProParam;

    models.Professionnel.findAll({
        where: { id: idCategorieProParam }
    }).then(function (professionnnelsFound) {
        if (professionnnelsFound) {
            return res.status(200).status(professionnnelsFound);
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
    var idProParam = req.params.idProParam;

    var nom = req.body.nom;
    var email = req.body.email;
    var tel = req.body.telephone;
    var adress = req.body.adress;
    var categoriePro = req.body.categorieProId;

    models.Professionnel.findOne({
        where: { id: idProParam }
    }).then(function (professionnelFound) {
        if (professionnelFound) {
            models.Professionnel.update({
                nom: (nom ? nom : professionnelFound.nom),
                email: (email ? email : professionnelFound.email),
                telephone: (tel ? telephone : professionnelFound.telephone),
                adress: (adress ? adress : professionnelFound.adress),
                categorieProId: (categoriePro ? categorieProId : professionnelFound.categorieProId)
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

        if (userFound && userFound.isAdmin == true) {

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