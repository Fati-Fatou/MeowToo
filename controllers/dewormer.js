const models = require('../models');

exports.dewormers_create_dewormer = async (req, res) => {
  const pDewormerDate = req.body.dewormerDate;
  const pNextDewormerDate = req.body.nextDewormerDate;
  const pPetID = req.body.petID;
  const pStatus = req.body.status;

  try {
    const dewormer = await models.Dewormer.create({
      dewormerDate: pDewormerDate,
      nextDewormerDate: pNextDewormerDate,
      petID: pPetID,
      status: pStatus,
    });
    return res.status(200).json(dewormer);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.dewormers_get_dewormer = async (req, res) => {
  try {
    const dewormer = await models.Dewormer.findOne({
      where: { id: req.params.idDewormer },
    });
    return res.status(200).json(dewormer);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.dewormers_get_dewormer_by_pet = async (req, res) => {
  try {
    const dewormer = await models.Dewormer.findOne({
      where: { petID: req.params.idPet },
    });
    return res.status(200).json(dewormer);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.dewormers_update_dewormer = async (req, res) => {
  const pIdDewormer = req.params.idDewormer;
  const pDewormerDate = req.body.dewormerDate;
  const pNextDewormerDate = req.body.nextDewormerDate;
  const pPetID = req.body.petID;
  const pStatus = req.body.status;

  try {
    const dewormerToUpdate = await models.Dewormer.findOne({
      where: { id: pIdDewormer },
    });

    try {
      const dewormerUpdated = dewormerToUpdate.update({
        dateVermifuge: (pDewormerDate || dewormerToUpdate.dewormerDate),
        dateProchainVermifuge: (pNextDewormerDate || dewormerToUpdate.nextDewormerDate),
        animalId: (pPetID || dewormerToUpdate.petID),
        statut: (pStatus || dewormerToUpdate.status),
      });
      return res.status(200).json(dewormerUpdated);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.dewormers_delete_dewormer = async (req, res) => {
  try {
    const dewormerToDeconste = await models.Dewormer.findOne({
      where: { id: req.params.idDewormer },
    });

    try {
      const dewormerDeconsted = await dewormerToDeconste.destroy;
      return res.status(200).json(dewormerDeconsted);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
