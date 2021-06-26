const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

exports.professional_categories_create = async (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    try {
        const category = await models.CategorieProfessionnelle.create({
            name: req.body.name
        });
        return res.status(200).json(category);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.professional_categories_get_all = async (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    try {
        const categories = await models.CategorieProfessionnelle.findAll();
        return res.status(200).json(categories);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.professional_categories_get_category = async (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    try {
        const categoryFound = await models.CategorieProfessionnelle.findOne({
            where: { id: req.params.idCategoriePro }
        });
        return res.status(200).json(categoryFound);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.professional_categories_update_category = async (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    let idCategorieProParam = req.params.idCategoriePro;
    let name = req.body.name;

    try {
        const categoryToUpdate = await models.CategorieProfessionnelle.findOne({
            where: { id: idCategorieProParam }
        });
        try {
            const categoryUpdated = await categoryToUpdate.update({
                name: (name ? name : categoriesProFound.name)
            });
            return res.status(200).json(categoryUpdated);
        } catch (e) {
            return res.status(400).json({ 'status': 400, message: e.message });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.professional_categories_delete_category = async (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    try {
        const userFound = models.Utilisateur.findOne({
            where: { id: userId }
        });
        if (userFound && userFound.isAdmin == true) {

            try {
                const categoryToDelete = await models.CategorieProfessionnelle.findOne({
                    where: { id: req.params.idCategoriePro }
                });
                try {
                    const categoryDeleted = await models.CategorieProfessionnelle.destroy({
                        where: { id: categoryToDelete.id }
                    });
                    return res.status(200).json(categoryDeleted);
                } catch (e) {
                    return res.status(400).json({ 'status': 400, message: e.message });
                }
            } catch (e) {
                return res.status(400).json({ 'status': 400, message: e.message });
            }
        } else {
            return res.status(400).json({ 'Error ': + ' Vérification utilisateur impossible' });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}