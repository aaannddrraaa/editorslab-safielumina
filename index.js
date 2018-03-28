const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('./knexfile');

const knex = Knex(knexConfig.development);
Model.knex(knex);

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  res.render('index', {});
});

app.listen(port, function listenHandler() {
  console.info(`Running on ${port}...`);
});
