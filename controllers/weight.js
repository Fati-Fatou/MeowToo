const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

exports.weights_create_weight = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const weightCreated = await models.Weight.create({
      animalId: req.params.idAnimal,
      weight: req.body.weight,
      weighingDate: req.body.weighingDate,
    });
    return res.status(200).json(weightCreated);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.weights_get_all_by_animal = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const weighings = await models.Weight.findAll({
      where: { animalId: req.params.idAnimal },
    });
    return res.status(200).json(weighings);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.weights_get_weight = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const weightFound = await models.Weight.findOne({
      where: { id: req.params.idWeight },
    });
    return res.status(200).json(weightFound);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.weights_update_weight = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  const pIdWeight = req.params.idWeight;
  const pWeight = req.body.weight;
  const pWeighingDate = req.body.weighingDate;

  try {
    const weightToUpdate = await models.Weight.findOne({
      where: { id: pIdWeight },
    });

    try {
      const weightUpdated = await weightToUpdate.update({
        Weight: (pWeight || weightToUpdate.weight),
        datePesee: (pWeighingDate || weightToUpdate.weighingDate),
      });
      return res.status(200).json(weightUpdated);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.weights_delete_weight = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const weightToDelete = await models.Weight.findOne({
      where: { id: req.params.idWeight },
    });
    try {
      const weightDeleted = await weightToDelete.destroy({
        where: { id: req.params.idWeight },
      });
      return res.status(200).json(weightDeleted);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
