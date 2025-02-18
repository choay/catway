const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save()
            .then(catways => {
                res.render('dashboard', { 
                    user: user, 
                    catways: catways 
                });
            })
                .catch(error => res.status(400).json({ error }));
            })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    const token = jwt.sign(
                        { userId: user._id },
                        process.env.JWT_SECRET,
                        { expiresIn: '24h' }
                    );
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 24 * 60 * 60 * 1000 // 24 hours
                    });

                    
                    const catways = ['Catway 1', 'Catway 2', 'Catway 3'];

                    res.render('dashboard', { 
                        user: user, 
                        token: token,
                        catways: catways
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
