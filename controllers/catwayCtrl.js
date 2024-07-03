const { render } = require('ejs');
const Catway = require('../models/catway');


exports.createCatway = (req, res, next) => {
  const { catwayNumber, type, catwayState } = req.body;

  if (!catwayNumber || !type || !catwayState) {
    return res.status(400).json({ message: "All fields (catwayNumber, type, catwayState) are required." });
  }

  const catway = new Catway({
    catwayNumber,
    type,
    catwayState
  });

  catway.save()
    .then(() => {
      res.status(201).json({
        message: 'Catway created successfully!',
        catway: catway
      });
    })
    .catch(error => {
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          message: 'Validation failed!',
          errors: error.errors
        });
      }
      return res.status(500).json({ error });
    });
};

exports.getOneCatway = (req, res, next) => {
  Catway.findById(req.params.id)
  .then(catway => {
      if (!catway) {
          return res.status(404).send('Catway not found');
      }
      return res.render('catwayDetails', { catway: catway }); 
  })
  .catch(error => {
      return res.status(400).json({ error: error }); 
  });
};

exports.modifyCatway = (req, res, next) => {
  const catway = new Catway({
    _id: req.params.id,
    catwayNumber: req.body.catwayNumber,
    type: req.body.type,
    catwayState: req.body.catwayState
  });
  Catway.updateOne({_id: req.params.id}, catway).then(
    () => {
      res.status(201).json({
        message: 'Catway updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteCatway = (req, res, next) => {
  Catway.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllCatways = (req, res, next) => {
  Catway.find()
        .then(catways => {
          if (!catways) {
            return res.status(404).send('pages not found');
        }
        return res.render('catways', { catways: catways }); 
        })
        .catch(error => {
            res.status(500).json({ error: error.message }); 
        });

};