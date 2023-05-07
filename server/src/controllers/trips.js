const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');

const Trip = mongoose.model('trip');

router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(403).send('Nincs bejelentkezve');
    }
    const filter = {};

    if (req.query.origin) {
        filter['origin'] = req.query.origin;
    }
    if (req.query.destination) {
        filter['destination'] = req.query.destination;
    }
    if (req.query.username) {
        filter['username'] = req.query.username;
    }

    try {
        const trips = await Trip.find(filter);
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

router.post('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(403).send('Nincs bejelentkezve');
    }
    console.log(req.body)
    const trip = new Trip({
        tripid: 'temp',
        username: req.body.username,
        origin: req.body.origin,
        destination: req.body.destination,
        description: req.body.description,
    });
    try {
        const newTrip = await trip.save();
        res.status(201).json(newTrip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});


router.patch('/:id', getTrip, async (req, res) => {
    if (req.body.description != null) {
      res.trip.description = req.body.description;
    }
    try {
      const updatedTrip = await res.trip.save();
      res.json(updatedTrip);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


router.delete('/:id', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(403).send('Nincs bejelentkezve');
    }
    try {
        trip = await Trip.findByIdAndDelete(req.params.id);
        if (trip == null) {
            return res.status(404).json({ message: 'Az utazás nem található' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    return res.status(202).send('Törlés sikeres');
});

router.get('/:id', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(403).send('Nincs bejelentkezve');
    }
    try {
        trip = await Trip.findById(req.params.id);
        if (trip == null) {
            return res.status(404).json({ message: 'Az utazás nem található' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    return res.status(202).send(trip);
});


async function getTrip(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(403).send('Nincs bejelentkezve');
    }
    try {
        trip = await Trip.findById(req.params.id);
        if (trip == null) {
            return res.status(404).json({ message: 'Az utazás nem található' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.trip = trip; // ettől kezdve a response-ban benne van a db-ből lekért user objektum
    next();
}

module.exports = router