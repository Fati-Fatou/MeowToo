// Imports
var express = require('express');
var userCtrl = require('./routes/userController');
var animalCtrl = require('./routes/animalController');

// Router
exports.router = (function() {
    var apiRouter = express.Router();

    // Users routes
    apiRouter.route('/users/register/').post(userCtrl.register);
    apiRouter.route('/users/login/').post(userCtrl.login);
    apiRouter.route('/users/me/').get(userCtrl.getUserProfile);
    apiRouter.route('/users/me/').put(userCtrl.updateUserProfile);

    // Animals routes
    apiRouter.route('/animals/new/').post(animalCtrl.createAnimal);

    return apiRouter;
})();