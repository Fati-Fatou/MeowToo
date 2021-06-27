const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

exports.professionals_create_professional = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const professional = await models.Professional.create({
      name: req.body.name,
      email: req.body.email,
      telephone: req.body.telephone,
      address: req.body.address,
      zipCode: req.body.zipCode,
      userID: userId,
      professionalCategoryID: req.body.professionalCategoryID,
    });
    return res.status(200).json(professional);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.professionals_get_all_by_user = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const pUserId = jwtUtils.getUserId(headerAuth);

  if (pUserId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const professionals = await models.Professional.findAll({
      where: { userId: pUserId },
    });
    return res.status(200).json(professionals);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.professionals_get_all_by_category = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const pUserId = jwtUtils.getUserId(headerAuth);

  if (pUserId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const professionals = await models.Professional.findAll({
      where: { categorieProId: req.params.idCategorieProParam },
      include: [{
        model: models.ProfessionalCategory,
        attributes: ['libelle'],
        as: 'professionalCategory',
      }],
    });
    return res.status(200).json(professionals);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.professionals_get_professional = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const pUserId = jwtUtils.getUserId(headerAuth);

  if (pUserId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const professionalFound = await models.Professional.findOne({
      where: { id: req.params.idProfessional },
    });
    return res.status(200).json(professionalFound);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.professionals_update_professional = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const pUserId = jwtUtils.getUserId(headerAuth);

  if (pUserId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  const pIdPro = req.params.idProfessional;
  const pname = req.body.name;
  const pEmail = req.body.email;
  const pTelephone = req.body.telephone;
  const pAddress = req.body.address;
  const pZipCode = req.body.zipCode;
  const pProfessionalCetegoryID = req.body.professionalCategoryID;

  try {
    const professionalFound = await models.Professionnel.findOne({
      where: { id: pIdPro },
    });

    try {
      const professionalUpdated = await professionalFound.update({
        name: (pname || professionalFound.name),
        email: (pEmail || professionalFound.email),
        telephone: (pTelephone || professionalFound.telephone),
        address: (pAddress || professionalFound.adress),
        zipCode: (pZipCode || professionalFound.zipCode),
        // eslint-disable-next-line max-len
        professionalCategoryID: (pProfessionalCetegoryID || professionalFound.professionalCategoryID),
      });
      return res.status(200).json(professionalUpdated);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.professionals_delete_professional = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const professionalFound = await models.Professionnel.findOne({
      where: { id: req.params.idProfessional },
    });
    try {
      const professionalDeleted = await models.Professional.destroy({
        where: { id: professionalFound.id },
      });
      return res.status(200).json(professionalDeleted);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
