// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const animalRoutes = require('./routes/animalController');
const userRoutes = require('./routes/userController');

// Body parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/animals', animalRoutes);
app.use('/user', userRoutes);

// for parsing multipart/form-data
app.use(upload.none()); 
app.use(express.static('public'));

module.exports = app;