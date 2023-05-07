const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('user');

const passport = require('passport');

// #3 Login implementálása
router.route('/login').post((req, res, next) => {
  if (req.body.username, req.body.password) {
    passport.authenticate('local', function (error, user) {
      if (error) return res.status(500).send(error);

      req.login(user, function (error) {
        if (error) return res.status(500).send(error);
        console.log("login successful");
        return res.status(200).send({ "message": "Login successful" });
      })
    })(req, res);
  } else {
    return res.status(400).send({ "message": "Login unsuccessful" });
  }
});

router.route('/logout').post((req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        console.log('Hiba a kijelentkezés során');
        return res.status(500).send(err)
      }
      return res.status(200).send({ "message": "Kijelentkezes sikeres" });
    });
  } else {
    return res.status(403).send({ "message": "Nem is volt bejelentkezve" });
  }
})

router.route('/status').get((req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.user)
    return res.status(200).send(req.user);
  } else {
    return res.status(403).send({ "message": "Nem is volt bejelentkezve" });
  }
})


async function getUser(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).send('Nincs bejelentkezve');
  }
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'A felhasználó nem található' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (req.session.passport.user.username != user.username
    && req.session.passport.user.role != 'admin') {
    return res.status(403).send('Nincs jogosultsága');
  }
  res.user = user;
  next();
}


router.get('/', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(403).send('Nincs bejelentkezve');
  }
  if (req.session.passport.user.role != 'admin') {
    return res.status(403).send('Nincs admin jogosultsága');
  }
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getUser, (req, res) => {

  res.json(res.user);
});


router.post('/', async (req, res) => {
  console.log(req.body);
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    role: 'user',
    birthdate: req.body.birthdate,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.patch('/:id', getUser, async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(403).send('Nincs bejelentkezve');
  }
  if (req.session.passport.user.role != 'admin') {
    return res.status(403).send('Nincs admin jogosultsága');
  }
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.role != null) {
    res.user.role = req.body.role;
  }
  if (req.body.birthdate != null) {
    res.user.birthdate = req.body.birthdate;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'A felhasználó sikeresen törölve!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router