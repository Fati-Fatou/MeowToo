// Imports
const express = require('express');
const router = express.Router();
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

router.post('/new', (req, res) => {

    models.CategorieProfessionnelle.create({
        libelle: req.body.libelle
    }).then(function (newCategoriePro) {
        if (newCategoriePro) {
            return res.status(200).json(newCategoriePro);
        } else {
            return res.status(400).json({ 'Error': ' La nouvelle catégorie professionennelle n\' pas pû être créée.' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Création catégorie professonnelle impossible' });
    });
});

router.get('/getAll', (req, res) => {

    models.CategorieProfessionnelle.findAll()
        .then(function (categoriesProFound) {
            if (categoriesProFound) {
                return res.status(200).json(categoriesProFound);
            } else {
                return res.status(400).json({ 'Error': 'Impossible de récupérer les catégories professionnelles.' });
            }
        }).catch(function (error) {
            return res.status(500).json(error);
        });

});

router.update('/update/:idCategoriePro', (req, res) => {
    // Param
    var idCategorieProParam = req.params.idCategoriePro;

    var libelle = req.body.libelle;

    models.CategorieProfessionnelle.findOne({
        where: { id: idCategorieProParam }
    }).then(function (categoriesProFound) {
        if (categoriesProFound) {
            categoriesProFound.update({
                libelle: (libelle ? libelle : categoriesProFound.libelle)
            }).then(function (categoriesProUpdated) {
                if (categoriesProUpdated) {
                    return res.status(200).json(categoriesProUpdated);
                } else {
                    return res.status(400).json({ 'Error': ' La catégorie professionnelle n\'a pas été modifiée' });
                }
            }).catch(function (error) {
                return res.status(500).json({ 'Error': error + ' Modification impossible' });
            });
        } else {
            return res.status(500).json({ 'Error': error + ' Catégorie professionnelle non trouvée dans la base de donnée' });
        }
    })
});

router.delete('/delete/:idCategoriePro', (req, res) => {
    // Param
    var idCategorieProParam = req.params.idCategoriePro;
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Utilisateur.findOne({
        where: { id: userId }
    }).then(function(userFound) {
        
        if(userFound && userFound.isAdmin == true) {

            models.CategorieProfessionnelle.destroy({
                where: { id: idCategorieProParam }
            }).then(function(categorieProDeleted) {
                return res.status(200).json(categorieProDeleted);
            }).catch(function(error) {
                return res.status(400).json({ 'Error': error + ' Catégorie professionnelle n\'a pas été supprimée' });
            });
        } else {
            return res.status(400).json({ 'Error': ' Utilisateur non trouvé dans la base de données' });
        }
    }).catch(function(error) {
        return res.status(400).json({ 'Error': error + ' Vérification utilisateur impossible' });
    });
});

module.exports = router;