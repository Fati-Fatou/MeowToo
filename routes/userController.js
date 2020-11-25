// Imports
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');

// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


router.post('/login', (req, res) => {
    // Params
    var email = req.body.email;
    var password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).json({ 'error': 'paramètres manquants' });
    }

    models.Utilisateur.findOne({
        where: { email: email }
    })
        .then(function (userFound) {
            if (userFound) {

                bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                    if (resBycrypt) {
                        return res.status(201).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    } else {
                        console.log('DEBUG ' + userFound.password);
                        return res.status(403).json({ 'error': 'password invalide' });
                    }
                });
            } else {
                return res.status(404).json({ 'error': 'utilisateur non présent dans la Base de données' });
            }
        })
        .catch(function (err) {
            return res.status(500).json({ 'error': 'vérification utilisateur impossible' });
        });
});

router.post('/register', (req, res) => {
    // Params
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var email = req.body.email;
    var password = req.body.password;

    if (nom == null || prenom == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ 'error': 'Email invalide' });
    }

    if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({ 'error': 'Password invalide' });
    }

    models.Utilisateur.findOne({
        attributes: ['email'],
        where: { email: email }
    })
        .then(function (userFound) {
            if (!userFound) {

                bcrypt.hash(password, 5, function (err, bycryptedPassword) {
                    var newUser = models.Utilisateur.create({
                        nom: nom,
                        prenom: prenom,
                        email: email,
                        password: bycryptedPassword,
                        isAdmin: 0
                    })
                        .then(function (newUser) {
                            return res.status(201).json({ 'userId': newUser.id });
                        })
                        .catch(function (err) {
                            return res.status(500).json({ 'error': 'Ajout de l\'utilisateur impossible' });
                        });
                });

            } else {
                return res.status(409).json({ 'error': 'user already exist' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
        });
});


router.get('/getUserProfile', (req, res) => {
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Utilisateur.findOne({
        attributes: ['id', 'nom', 'prenom', 'email'],
        where: { id: userId }
    }).then(function (user) {
        if (user) {
            return res.status(201).json(user);
        }
        else {
            return res.status(404).json({ 'error': 'utilisateur non trouvé' });
        }
    });
});

router.get('/getAllUsers', (req, res) => {
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Utilisateur.findOne({
        where: { id: userId }
    }).then(function (userFound) {
        if (userFound && userFound.isAdmin == 1) {
            models.Utilisateur.findAll({
                attributes: ['id', 'nom', 'prenom', 'email', 'telephone', 'isAdmin'],
            }).then(function (usersList) {
                return res.status(200).json(usersList);
            }).catch(function (error) {
                return res.status(400).json({ 'error': error + ' Erreur récupération liste des utilisateurs' });
            });
        } else {
            return res.status(404).json({ 'error': 'utilisateur non identifié ' });
        }
    }).catch(function (error) {
        return res.status(400).json({ 'error': 'vérification utilisateur impossible' });
    });
});

router.put('/updateUser', (req, res) => {
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    // Params
    var email = req.body.email;
    var telephone = req.body.telephone;

    models.Utilisateur.findOne({
        attributes: ['email', 'password', 'telephone'],
        where: { id: userId }
    }).then(function (userFound) {
        if (userFound) {
            userFound.update({
                email: (email ? email : userFound.email),
                telephone: (telephone ? telephone : userFound.telephone)
            }).then(function (userUpdated) {
                if (userUpdated) {
                    return res.status(200).json(userUpdated);
                } else {
                    return res.status(400).json({ 'error': 'Erreur lors de la modification de l\'utilisateur' });
                }
            });
        }
    });
});

router.put('/:idUser', (req, res) => {
    // Param
    var idUserParam = req.params.idUser;
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Utilisateur.findOne({
        where: { id: userId }
    }).then(function (userFound) {
        if (userFound && userFound.isAdmin == 1) {
            models.Utilisateur.update({
                attributes: ['email', 'password', 'telephone'],
                where: { id: idUserParam }
            }).then(function (userUpdated) {
                return res.status(200).json(userUpdated);
            }).catch(function (error) {
                return res.status(400).json({ 'Error:': error + ' L\'utilisateur n\'a pas été modifié' });
            });
        } else {
            return res.status(400).json({ 'Error:': ' Utilisateur non trouvé dans la base de donnée OU non admin' });
        }
    }).catch(function (errror) {
        return res.status(400).json({ 'Error:': ' Vérification de l\'utilisateur impossible' });
    });
});

// Delete current user
router.delete('/', (req, res) => {
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Utilisateur.findOne({
        where: { id: userId }
    }).then(function (userFound) {
        if (userFound) {
            models.Utilisateur.destroy({
                where: { id: userId }
            }).then(function () {
                return res.status(200).json({ 'Message Sucess': 'L\'utilisateur a bien été supprimé' });
            }).catch(function (error) {
                return res.status(400).json({ 'Error': error + ' L\'utilisateur n\'a pas été supprmié' });
            });
        } else {
            return res.status(400).json({ 'Error': ' Utilisateur non trouvé dans la base de donnée OU non admin' });
        }
    }).catch(function (error) {
        return res.status(400).json({ 'Error': error + ' Vérification de l\'utilisateur impossible' });
    });
});

// Admin delete one user
router.delete('/:id', (req, res) => {
    // Param
    var idUserParam = req.params.id;
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
            
            models.Utilisateur.destroy({
                where: { id: idUserParam }
            }).then(function(isDeleted) {
                if(isDeleted == true) {
                    return res.status(200).json({isDeleted});
                } else {
                    return res.status(400).json({ 'Message Sucess': 'L\'utilisateur n\'a pas été supprimé' });
                }
                
            }).catch(function (error) {
                return res.status(500).json({ 'Error': error + ' Supression utilisateur impossible' });
            });
        } else {
            return res.status(400).json({ 'Error': ' Utilisateur non trouvé dans la base de donnée OU non admin' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error': error + ' Vérification de l\'utilisateur impossible' });
    });
});

module.exports = router;