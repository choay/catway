const Catway = require('../models/catway');

// Afficher le formulaire de création d'un nouveau catway
exports.getNewCatwayForm = (req, res) => {
    res.render('newCatway');
};

// Créer un nouveau catway
exports.createCatway = async (req, res) => {
    try {
        const { catwayNumber, type, catwayState } = req.body;
        const newCatway = new Catway({
            catwayNumber,
            type,
            catwayState
        });
        await newCatway.save();
        res.redirect('/catways');
    } catch (error) {
        console.error('Error creating catway:', error);
        res.status(500).send({ error: 'Error creating catway' });
    }
};

// Afficher les détails d'un catway existant
exports.getCatwayById = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) {
            return res.status(404).send({ error: 'Catway not found' });
        }
        res.render('catwayDetails', { catway });
    } catch (error) {
        console.error('Error fetching catway:', error);
        if (error.name === 'CastError') {
            return res.status(400).send({ error: 'Invalid catway ID' });
        }
        res.status(500).send({ error: 'Error fetching catway' });
    }
};

// Afficher la liste des catways
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find({});
        res.render('catways', { catways });
    } catch (error) {
        console.error('Error fetching catways:', error);
        res.status(500).send({ error: 'Error fetching catways' });
    }
};
exports.getEditCatwayForm = async (req, res) => {
  try {
      const catway = await Catway.findById(req.params.id);
      if (!catway) {
          return res.status(404).send({ error: 'Catway not found' });
      }
      res.render('editCatway', { catway });
  } catch (error) {
      console.error('Error fetching catway for edit:', error);
      if (error.name === 'CastError') {
          return res.status(400).send({ error: 'Invalid catway ID' });
      }
      res.status(500).send({ error: 'Error fetching catway for edit' });
  }
};

// Mettre à jour un catway existant
exports.updateCatway = async (req, res) => {
  try {
      const { catwayNumber, type, catwayState } = req.body;
      const updatedCatway = await Catway.findByIdAndUpdate(req.params.id, {
          catwayNumber,
          type,
          catwayState
      }, { new: true });
      if (!updatedCatway) {
          return res.status(404).send({ error: 'Catway not found' });
      }
      res.redirect(`/catways/${req.params.id}`);
  } catch (error) {
      console.error('Error updating catway:', error);
      if (error.name === 'CastError') {
          return res.status(400).send({ error: 'Invalid catway ID' });
      }
      res.status(500).send({ error: 'Error updating catway' });
  }
};