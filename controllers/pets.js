/* eslint-disable prefer-destructuring */
const moment = require('moment');
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

exports.pets_create_pet = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const petCreated = await models.Pet.create({
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      userID: userId,
      species: req.body.species,
      gender: req.body.gender,
      race: req.body.race,
      image: req.file,
    });
    return res.status(200).json(petCreated);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.pets_get_all = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const pets = await models.pet.findAll({
      where: { utilisateurId: userId },
      include: [{
        model: models.Utilisateur,
        attributes: ['id', 'nom', 'prenom'],
      }],
    });
    return res.status(200).json(pets);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.pets_get_pet = async (req, res) => {
  const pIdPet = req.params.idPet;

  try {
    const petFound = await models.Pet.findOne({
      where: { id: pIdPet },
    });

    const dateOfBirthFormat = moment(petFound.dateOfBirth).format('DD-MM-YYYY');

    const render = {
      name: petFound.name,
      dateOfBirth: dateOfBirthFormat,
      species: petFound.species,
      gender: petFound.gender,
      race: petFound.race,
      image: petFound.image,
    };

    return res.status(200).json(render);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.pets_update_pet = async (req, res) => {
  const { idPet } = req.params;
  const pNom = req.body.nom;
  const pDateNaissance = req.body.dateNaissance;
  const pEspece = req.body.espece;
  const pGenre = req.body.genre;
  const pRace = req.body.race;
  const pImage = req.file;

  // Get Auth Header
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const petFound = await models.Pet.findOne({
      where: { id: idPet },
    });

    try {
      const petUpdated = await models.Pet.update({
        nom: (pNom || petFound.nom),
        dateNaissance: (pDateNaissance || petFound.dateNaissance),
        espece: (pEspece || petFound.espece),
        genre: (pGenre || petFound.genre),
        race: (pRace || petFound.race),
        image: (pImage || petFound.image),
      }, {
        where: { id: petFound.id },
      });
      return res.status(200).json(petUpdated);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.pets_delete_pet = async (req, res) => {
  const { idPet } = req.params;

  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const petFound = await models.Pet.findOne({
      where: { id: idPet },
    });

    try {
      const petDeleted = await models.Pet.destroy({
        where: { id: petFound.id },
      });
      return res.status(200).json(petDeleted);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
