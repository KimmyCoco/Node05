const router = require('express').Router();

const animalController = require('../controllers/animal.controller');

// @route   GET /animals
// @desc    Get all animals
// @access  Public
router.get('/', animalController.getAllAnimals)

// @route   GET /animals/new
// @desc    View create animal page
// @access  Public
router.get('/new', animalController.createAnimalView);

// @route   POST /animals/new
// @desc    Add an animal
// @access  Public
router.post('/', animalController.createAnimal);

// @route   GET /animals/:id
// @desc    Get a certain animal by id
// @access  Public
router.get('/:id', animalController.showAnimal);

// @route   GET /animals/:id/edit
// @desc    View edit animal page
// @access  Public
router.get('/:id/edit', animalController.updateAnimalView);

// @route   PUT /animals/:id
// @desc    Update an animal
// @access  Public
router.put('/:id', animalController.updateAnimal);

// @route   DELETE /animals/:id
// @desc    Delete an animal
// @access  Public
router.delete('/:id', animalController.deleteAnimal);

module.exports = router;

