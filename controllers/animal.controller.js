//import the model
const Animal = require('../models/animals.model');

//pre-defined categories
const categories = ['dog', 'cat', 'lizard', 'spider', 'snake'];

exports.getAllAnimals = async(req, res) => {
    const { category } = req.query;
    if(category){
        const animals = await Animal.find({category})
        res.render('animals/index', { animals, category })
    }else{
        const animals = await Animal.find({})
        res.render('animals/index', { animals, category: 'All' });
    }
}

exports.showAnimal = async(req,res) => {
    const { id } = req.params;
    const animal = await Animal.findById(id);
    res.render('animals/show', { animal })
}

exports.createAnimalView = (req, res) => {
    res.render('animals/new', { categories });
}

exports.createAnimal = async(req, res) => {
    const newAnimal = new Animal(req.body);
    await newAnimal.save();
    res.redirect(`/animals/${newAnimal._id}`);
}

exports.updateAnimalView = async(req,res) => {
    const { id } = req.params;
    const animal = await Animal.findById(id)
    res.render('animals/edit', { animal, categories });
}

exports.updateAnimal = async(req,res) => {
    const { id } = req.params;
    const animal = await Animal
        .findByIdAndUpdate(id, req.body, { runValidators: true, useFindAndModify: false, new: true });
    res.redirect(`/animals/${animal._id}`);
}

exports.deleteAnimal = async(req,res) => {
    const { id } = req.params;
    await Animal.findByIdAndDelete(id)
    res.redirect('/animals')
}