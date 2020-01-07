require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('../database/postgres.js');

const app = express();
const Port = process.env.PORT || 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../../dist'));
app.use(cors());


app.post('/menu/:restaurantId', (req, res) => {
  db.addMenuItem(req.body)
  .then(() => {
    res.sendStatus(201);
  })
  .catch(() => {
    res.sendStatus(404);
  })
});

app.get('/menu/:restaurantId', (req, res) => {
  return db.getMenus(req.params)
  .then((menus) => {
    res.send(menus.rows);
  })
  .catch(() => {
    res.sendStatus(404)
  })
});

app.get('/menu/:restaurantId/:menuType', (req, res) => {
  return db.getMenuItems(req.params)
  .then((menus) => {
    res.send(menus.rows);
  })
  .catch(() => {
    res.sendStatus(404)
  })
});

app.put('/menu/:restaurantId', function(req, res) {
  db.updateMenu(req.body)
  .then(() => {
    res.sendStatus(200);
  })
  .catch(() => {
    res.sendStatus(404);
  })
});

// deletes a given item on a menu
app.delete('/menu/:restaurantId/', function(req, res) {
  db.deleteItem(req.body)
  .then(() => {
    res.sendStatus(200);
  })
  .catch(() => {
    res.sendStatus(404);
  })
});

// deletes a given menu
app.delete('/menu/:restaurantId/:menuType', function(req, res) {
  db.deleteMenu(req.params)
  .then(() => {
    res.sendStatus(200);
  })
  .catch(() => {
    res.sendStatus(404);
  })
});

app.listen(Port, () => {
  console.log(`listening on port ${Port}`);
});
