const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();

//import the routes
const animalRoute = require('./routes/animal.route');

//setup the views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//setup the parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setup the override
app.use(methodOverride('_method'));

//routes
app.use('/animals', animalRoute);

//connect to db and express
mongoose
  .connect("mongodb://127.0.0.1:27017/animalShelter", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database!");
    app.listen(3000, () => console.log('Server has started on PORT 3000'))
  })
  .catch((err) => {
    console.log(err);
  });