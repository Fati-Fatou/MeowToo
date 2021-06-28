const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

exports.treatmentReminders_create_treatmentReminder = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const treatmentReminder = await models.treatmentReminder.create({
      treatmentID: req.body.treatmentID,
      remindeDate: req.body.remindeDate,
    });
    return res.status(200).json(treatmentReminder);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.treatmentReminders_get_treatmentReminder = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const treatmentReminder = await models.treatmentReminder.findOne({
      where: { id: req.params.idTreatmentReminder },
    });
    return res.status(200).json(treatmentReminder);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.treatmentReminders_get_by_treatment = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const treatmentReminders = await models.treatmentReminder.findAll({
      where: { treatmentID: req.params.treatmentID },
    });
    return res.status(200).json(treatmentReminders);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.treatmentReminders_get_by_pet = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const treatmentReminders = await models.treatmentReminder.findAll({
      where: { petID: req.params.idPet },
    });
    return res.status(200).json(treatmentReminders);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// TODO UPDATE


// TODO DELETE
