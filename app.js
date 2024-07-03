const express = require('express');
const mongoose = require('mongoose');
const catwayRoutes = require('./routes/catways');
const userRoutes = require('./routes/user');
const reservationRoutes = require('./routes/reservation')
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());

mongoose.connect(
  process.env.URI_MONGO , {
  //useNewUrlParser: true,
  //useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('index', {title: 'Home'});
});

app.use('/auth', userRoutes);
app.use('/catways', catwayRoutes);
app.use('/reservations', reservationRoutes);
app.use('/catways', reservationRoutes);

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/documentation', (req, res) => {
  res.render('documentation');
});

app.get('/dashboard', (req, res) => {
  // Vous devrez peut-être récupérer les données utilisateur et les catways ici.
  // Pour l'instant, voici un exemple simple sans récupération de données.
  res.render('dashboard', { user: { name: "Utilisateur" }, catways: [] });
});


module.exports = app;