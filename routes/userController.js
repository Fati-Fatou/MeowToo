// Imports
var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');

//Routes
module.exports = {
    register: function(req, res) {
        
        // Params
        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var email = req.body.email;
        var password = req.body.password;

        if (nom == null || prenom == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters'});
        }

        // TODO verify mail regex, password etc Email is exist

        models.Utilisateur.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then(function(userFound) {
            if(!userFound) {

                bcrypt.hash(password, 5, function(err, bycryptedPassword) {
                    var newUser = models.Utilisateur.create({
                        nom: nom,
                        prenom: prenom,
                        email: email,
                        password: bycryptedPassword,
                        isAdmin: 0
                    })
                    .then(function(newUser) {
                        return res.status(201).json({'userId': newUser.id});
                    })
                
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'Ajout de l\'utilisateur impossible'});
                });
            });

            } else {
                return res.status(409).json({ 'error': 'user already exist'});
            }
            
        }).catch(function(err) {
            return res.status(500).json({'error': 'unable to verify user'});
        });
    },
    login: function(req, res) {
        // Params
        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({'error': 'paramètres manquants'});
        }

        models.Utilisateur.findOne({
            where: { email: email }
        })
        .then(function(userFound) {
            if (userFound) {

                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    if (resBycrypt) {
                        return res.status(201).json({ 
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });              
                    } else {
                        console.log('DEBUG ' + userFound.password);
                        return res.status(403).json( {'error': 'password invalide'});
                    }
                });
            } else {
                return res.status(404).json({'error': 'utilisateur non présent dans la Base de données'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({'error': 'vérification utilisateur impossible'});
        });
    }
}