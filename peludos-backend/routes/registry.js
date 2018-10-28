const express = require('express');
const router = express.Router();
const PetRegistry = require('../models/PetRegisty');


router.get('/test', function (req, res, next) {
    res.json({ title: 'Express' });
});



router.post('/save_pet/', function (req, res) {
    const newRegistry = new PetRegistry({
        _id: req.body._id,
        date: req.body.date,
        coordinates: req.body.coordinates,
        animal: {
            _id: req.body.animal._id,
            animalType: req.body.animal.animalType
        }
    });

    newRegistry.save(function (err) {
        console.log(error);
    });

    res.json({ title: 'Express' });
});

module.exports = router;
