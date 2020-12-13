// Imports
const express = require('express');
const router = express.Router();
const models = require('../models');


router.post('/new', (req, res) => {
    // Params
    var pLibelle = req.body.libelle;
    var pDateDebut = req.body.dateDebut;
    var pDateFin = req.body.dateFin;
    var pRappel = req.body.rappel;
    var pTypeRappel = req.body.typeRappel;
    var pAnimalId = req.body.animalId;
    var pStatut = req.body.statut;
    
    models.Medicament.create({
        libelle: pLibelle,
        dateDebut: pDateDebut,
        dateFin: pDateFin,
        rappel: pRappel,
        typeRappel: pTypeRappel,
        animalId: pAnimalId,
        statut: pStatut
    }).then(function (medicamentCreated) {
        if (medicamentCreated) {
            return res.status(200).json(medicamentCreated);
        } else {
            return res.status(400).json({ 'Error ' : pLibelle + ' n\'a pas été créé.' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error': ' Impossible de créer ' + pLibelle });
    });
});

router.get('/mesTraitements/:idAnimal', (req, res) => {
    // Param
    var pIdAnimal = req.params.idAnimal;

    models.Medicament.findAll({
        where: { animalId: pIdAnimal },
        include: [{
            model: models.Animal,
            attributes: [ 'id', 'nom', 'espece', 'genre' ],
        }],        
    }).then(function (medicamentsFound) {
        if (medicamentsFound) {
            return res.status(200).json(medicamentsFound);
        } else {
            return res.status(400).json({ 'Error': 'Il n\'y a pas de traitements pour cet animal' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Recherche des médicaments impossible' });
    });
});

router.get('/:idMedicament', (req, res) => {
    // Param
    var pIdMedicament = req.params.idMedicament;

    models.Medicament.findOne({
        where: { id: pIdMedicament }
    }).then(function (medicmamentFound) {
        if (medicmamentFound) {
            return res.status(200).json(medicmamentFound);
        } else {
            return res.status(400).json({ 'Error ' : 'Le médicament demandé n\'est pas dans la base de données' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Recherche du médicament impossible' });
    });
});

router.patch('/:idMedicament', (req, res) => {
    // Params
    var pIdMedicament = req.params.idMedicament;
    var pLibelle = req.body.libelle;
    var pDateDebut = req.body.dateDebut;
    var pDateFin = req.body.dateFin;
    var pRappel = req.body.rappel;
    var pTypeRappel = req.body.typeRappel;
    var pAnimalId = req.body.animalId;
    var pStatut = req.body.statut;

    models.Medicament.findOne({
        where: { id: pIdMedicament }
    }).then(function (medicamentFound) {
        if (medicamentFound) {
             medicamentFound.update({
                libelle: (pLibelle ? pLibelle : medicamentFound.libelle),
                dateDebut: (pDateDebut ? pDateDebut : medicamentFound.dateDebut),
                dateFin: (pDateFin ? pDateFin : medicamentFound.dateFin),
                rappel: (pRappel ? pRappel : medicamentFound.rappel),
                typeRappel: (pTypeRappel ? pTypeRappel : medicamentFound.typeRappel),
                animalId: (pAnimalId ? pAnimalId : medicamentFound.animalId),
                statut: (pStatut ? pStatut : medicamentFound.statut)
             }).then(function (medicamentUpdated) {
                 if (medicamentUpdated) {
                     return res.status(200).json(medicamentUpdated);
                 } else {
                     return res.status(400).json({ 'Error ' : 'Le médicament ' + medicamentFound.libelle + ' n\'a pas été mis à jour.' });
                 }
             }).catch(function (error) {
                 return res.status(500).json({ 'Error ': error + ' Mise à jour du médicament impossible.' });
             })
        } else {
            return res.status(400).json({ 'Error ' : 'Le médicament demandé n\'est pas dans la base de données.' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Recherche du médicament impossible.' });
    });
});

router.delete('/:idMedicament', (req, res) => {
    // Param 
    var pIdMedicament = req.params.idMedicament;

    models.Medicament.findOne({
        where: { id: pIdMedicament }
    }).then(function (medicamentFound) {
        if (medicamentFound) {
            medicamentFound.destroy({
            }).then(function (medicamentDeleted) {
                return res.status(200).json(medicamentDeleted);
            }).catch(function (error) {
                return res.status(500).json({ 'Error ': error + ' Suppression du médicament impossible.' });
            })
        } else {
            return res.status(400).json({ 'Error ': ' Le médicament demandé n\'est pas dans la base de données.' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ' : error + ' Recherche du médicament impossible.' });
    });
});

module.exports = router;