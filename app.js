const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const Usuario = require('./models/Usuario');

const app = express();

mongoose.connect('mongodb://localhost:27017/meubanco', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: false,
  partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('index'));

app.get('/cadastro', (req, res) => res.render('cadastro'));

app.post('/cadastro', async (req, res) => {
  await Usuario.create({
    nome: req.body.nome,
    email: req.body.email,
  });
  res.redirect('/usuarios');
});

app.get('/login', (req, res) => res.render('login'));

app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.render('usuarios', { usuarios });
});

app.use(express.static('public'));

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
