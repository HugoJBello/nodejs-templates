const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Animal = new Schema({
    _id: {
        type: String,
        required: false
    },
    animalType: {
        type: String,
        required: false
    }
})

const PetRegistry = new Schema({
    _id: {
        type: String,
        required: false
    },
    coordinates: {
        type: Array
    },
    date: {
        type: Date
    },
    animal: {
        type: Animal,
        required: false,
    }
},
    { collection: 'pet-registry' });

PetRegistry.index({ '$**': 'text' });

module.exports = mongoose.model('PetRegistry', PetRegistry);