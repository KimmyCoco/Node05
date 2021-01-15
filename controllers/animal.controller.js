//import the model
const Animal = require("../models/animals.model");
const AppError = require("../util/AppError");

//pre-defined categories
const categories = ["dog", "cat", "lizard", "spider", "snake"];

function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(err => next(err))
    }
}

exports.getAllAnimals = wrapAsync(async (req, res, next) => {
  const { category } = req.query;
  if (category) {
    const animals = await Animal.find({ category });
    if (!animals) {
      throw new AppError("Animals Not Found", 404);
    }
    res.render("animals/index", { animals, category });
  } else {
    const animals = await Animal.find({});
    res.render("animals/index", { animals, category: "All" });
  }
});

exports.showAnimal = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const animal = await Animal.findById(id);
    if (!animal) {
      throw new AppError("Animal Not Found", 404);
    }
    res.render("animals/show", { animal });
});

exports.createAnimalView = (req, res, next) => {
  res.render("animals/new", { categories });
};

exports.createAnimal = wrapAsync(async (req, res, next) => {
    const newAnimal = new Animal(req.body);
    await newAnimal.save();
    res.redirect(`/animals/${newAnimal._id}`);
});

exports.updateAnimalView = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const animal = await Animal.findById(id);
  if (!animal) {
    throw new AppError("Animal not found", 404);
  }
  res.render("animals/edit", { animal, categories });
});

exports.updateAnimal = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const animal = await Animal.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!animal) {
    throw new AppError("Animal not found", 404);
  }
  res.redirect(`/animals/${animal._id}`);
});
//'runValidators': false by default. Set to true to enable update validators for all validators by default.
// new: true --- return the new data after we update

exports.deleteAnimal = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  await Animal.findByIdAndDelete(id);
  res.redirect("/animals");
});
