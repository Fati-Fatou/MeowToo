const models = require('../models');

exports.vaccines_create_vaccine = async (req, res) => {

    let pVaccineDate = req.body.vaccineDate;
    let pNextVaccineDate = req.body.nextVaccineDate;
    let pPetID = req.body.petID;
    let pStatus = req.body.status;

    try {
        const vaccine = await models.Vaccine.create({
            vaccineDate: pVaccineDate,
            nextVaccineDate: pNextVaccineDate,
            petID: pPetID,
            status: pStatus
        });
        return res.status(200).json(vaccine);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
};

exports.vaccines_get_vaccine = async (req, res) => {
    try {
        const vaccine = await models.Vaccine.findOne({
            where: { id: idVaccine }
        });
        return res.status(200).json(vaccine);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
};

exports.vaccines_get_vaccine_by_pet = async (req, res) => {
    try {
        const vaccine = await models.Vaccine.findAll({
            where: { animalId: req.params.idPet, statut: 0 }
        });
        return res.status(200).json(vaccine);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
};

exports.vaccines_update_vaccine = async (req, res) => {

    let pIdVaccine = req.params.idVaccine;
    let pVaccineDate = req.body.vaccineDate;
    let pNextVaccineDate = req.body.nextVaccineDate;
    let pPetID = req.body.petID;
    let pStatus = req.body.status;

    try {
        const vaccineToUpdate = await models.Vaccine.findOne({
            where: { id: pIdVaccine}
        });

        try {
            const vaccineUpdated = await vaccineToUpdate.update({
                vaccineDate: (pVaccineDate ? pVaccineDate : vaccinFound.dateVaccin),
                nextVaccineDate: (pNextVaccineDate ? pNextVaccineDate : vaccinFound.dateProchainVaccin),
                petID: (pPetID ? pPetID : vaccinFound.animalId),
                status: (pStatus ? pStatus : vaccinFound.statut)
            });
            return res.status(200).json(vaccineUpdated);
        } catch (e) {
            return res.status(400).json({ 'status': 400, message: e.message });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
};

exports.vaccines_delete_vaccine = async (req, res) => {

  try {
    const vaccineToDelete = await models.Vaccine.findOne({
        where: { id: req.params.idVaccine }
    }); 

    try {
        const vaccineDeleted = await vaccineToDelete.destroy;
        return res.status(200).json(vaccineDeleted);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
  } catch (e) {
    return res.status(400).json({ 'status': 400, message: e.message });
  }
}