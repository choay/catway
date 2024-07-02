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
  Catway.findOne({
    _id: req.params.id
  }).then(
    (catway) => {
      res.status(200).json(catway);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
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
  Catway.find().then(
    (catways) => {
      res.status(200).json(catways);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};