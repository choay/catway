const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   try {
       const token = req.cookies.token;
       if (!token) {
           return res.status(401).json({ error: 'Authentification requise!' });
       }
       const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
       req.auth = {
           userId: decodedToken.userId
       };
       next();
   } catch(error) {
       res.status(401).json({ error: 'Token invalide!' });
   }
};
