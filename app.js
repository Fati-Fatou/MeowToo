// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const animalRoutes = require('./routes/animalController');

// Body parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// Routes
app.use('/animals', animalRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});


module.exports = app;