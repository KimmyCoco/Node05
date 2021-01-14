const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    breed: {
        type: String,
        required: false
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['dog', 'cat', 'lizard', 'spider', 'snake']
    }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;