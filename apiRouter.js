// Imports
var express = require('express');
var userCtrl = require('./routes/userController');

// Router
exports.router = (function() {
    var apiRouter = express.Router();

    // Users routes
    apiRouter.route('/users/register/').post(userCtrl.register);
    apiRouter.route('/users/login/').post(userCtrl.login);

    return apiRouter;
})();