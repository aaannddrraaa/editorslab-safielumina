const express = require('express');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  res.render('index', {});
});

app.listen(port, function listenHandler() {
  console.info(`Running on ${port}...`);
});
