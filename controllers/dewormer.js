const models = require('../models');

exports.dewormers_create_dewormer = async (req, res) => {

    let pDewormerDate = req.body.dewormerDate;
    let pNextDewormerDate = req.body.nextDewormerDate;
    let pPetID = req.body.petID;
    let pStatus = req.body.status;

    try {
        const dewormer = await models.Dewormer.create({
            dewormerDate: pDewormerDate,
            nextDewormerDate: pNextDewormerDate,
            petID: pPetID,
            status: pStatus
        });
        return res.status(200).json(dewormer);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
};


exports.dewormers_get_dewormer = async (req, res) => {
    try {
        const dewormer = await models.Dewormer.findOne({
            where: { id: req.params.idDewormer }
        });
        return res.status(200).json(dewormer);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
};

exports.dewormers_get_dewormer_by_pet = async (req, res) => {
    try {
        const dewormer = await models.Dewormer.findOne({
            where: { petID: req.params.idPet }
        });
        return res.status(200).json(dewormer);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
};

exports.dewormers_update_dewormer = async (req, res) => {

    let pIdDewormer = req.params.idDewormer;
    let pDewormerDate = req.body.dewormerDate;
    let pNextDewormerDate = req.body.nextDewormerDate;
    let pPetID = req.body.petID;
    let pStatus = req.body.status;

    try {
        const dewormerToUpdate = await models.Dewormer.findOne({
            where: { id: pIdDewormer }
        });

        try {
            const dewormerUpdated = dewormerToUpdate.update({
                dateVermifuge: ( pDewormerDate ? pDewormerDate : vermifugeFound.dewormerDate),
                dateProchainVermifuge: (pNextDewormerDate ? pNextDewormerDate : vermifugeFound.nextDewormerDate),
                animalId: (pPetID ? pPetID : vermifugeFound.petID),
                statut: (pStatus ? pStatus : vermifugeFound.status)
            });
            return res.status(200).json(dewormerUpdated);
        } catch (e) {
            return res.status(400).json({ 'status': 400, message: e.message });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
};

exports.dewormers_delete_dewormer = async (req, res) => {
    try {
        const dewormerToDelete = await models.Dewormer.findOne({
            where: { id: req.params.idDewormer }
        });

        try {
            const dewormerDeleted = await dewormerToDelete.destroy;
            return res.status(200).json(dewormerDeleted);
        } catch (e) {
            return res.status(400).json({ 'status': 400, message: e.message });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}