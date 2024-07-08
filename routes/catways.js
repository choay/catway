const express = require('express');
const router = express.Router();
const catwayCtrl = require('../controllers/catwayCtrl');

// Route pour afficher le formulaire de création d'un nouveau catway
router.get('/new', catwayCtrl.getNewCatwayForm);

// Route pour gérer la soumission du formulaire de création d'un nouveau catway
router.post('/', catwayCtrl.createCatway);

// Route pour afficher les détails d'un catway existant
router.get('/:id', catwayCtrl.getCatwayById);

// Route pour afficher la liste des catways
router.get('/', catwayCtrl.getAllCatways);

// Route pour afficher le formulaire d'édition d'un catway existant
router.get('/:id/edit', catwayCtrl.getEditCatwayForm);

// Route pour mettre à jour un catway existant
router.post('/:id/edit', catwayCtrl.updateCatway);
module.exports = router;

