const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();

//import the model
const Animal = require('./models/animals.model');

//setup the views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//setup the parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setup the override
app.use(methodOverride('_method'));

//pre-defined categories
const categories = ['dog', 'cat', 'lizard', 'spider', 'snake'];

//routes
app.get('/animals', async(req, res) => {
    const { category } = req.query;
    if(category){
        const animals = await Animal.find({category})
        res.render('animals/index', { animals, category })
    }else{
        const animals = await Animal.find({})
        res.render('animals/index', { animals, category: 'All' });
    }
})

app.get('/animals/new', (req, res) => {
    res.render('animals/new', { categories });
});

app.post('/animals', async(req, res) => {
    const newAnimal = new Animal(req.body);
    await newAnimal.save();
    res.redirect(`/animals/${newAnimal._id}`);
});

app.get('/animals/:id', async(req,res) => {
    const { id } = req.params;
    const animal = await Animal.findById(id);
    res.render('animals/show', { animal })
});

app.get('/animals/:id/edit', async(req,res) => {
    const { id } = req.params;
    const animal = await Animal.findById(id)
    res.render('animals/edit', { animal, categories });
});

app.put('/animals/:id', async(req,res) => {
    const { id } = req.params;
    const animal = await Animal.findByIdAndUpdate(id, req.body, { runValidators: true, useFindAndModify: true, new: true });
    res.redirect(`/animals/${animal._id}`);
});

app.delete('/animals/:id', async(req,res) => {
    const { id } = req.params;
    await Animal.findByIdAndDelete(id)
    res.redirect('/animals')
});

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