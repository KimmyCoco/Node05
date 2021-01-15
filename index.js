const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const AppError = require('./util/AppError');

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

const handleValidationErr = err => {
  // console.dir(err);
  return new AppError(`Validation Failed... ${err.message}`, 400);
}

//for single out the particular Mongoose Error type
app.use((err, req, res, next) => {
  if(err.name === 'ValidationError') err = handleValidationErr(err)
  next(err);
});

//catch all error middleware
app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong'} = err;
  res.status(status).send(message);
});

//connect to db and express
mongoose
  .connect("mongodb://127.0.0.1:27017/animalShelter", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Connected to Database!");
    app.listen(3000, () => console.log('Server has started on PORT 3000'))
  })
  .catch((err) => {
    console.log(err);
  });