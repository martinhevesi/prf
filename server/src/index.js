const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('./config/db')
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));
app.use(cors());

require('./config/userSchema');
require('./config/tripSchema');
require('./config/admin_bootstrap')();
const User = mongoose.model('user');

passport.use('local', new localStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) return done('Hiba lekeres soran', null);
        if (!user) return done('Nincs ilyen felhasználónév', null);
        user.comparePasswords(password, function (error, isMatch) {
            if (error) return done(error, false);
            if (!isMatch) return done('Hibas jelszo', false);
            return done(null, user);
        })

    })
}));

passport.serializeUser(function (user, done) {
    if (!user) return done('nincs megadva beléptethető felhasználó', null);
    return done(null, user);
});

passport.deserializeUser(function (user, done) {
    if (!user) return done("nincs user akit kiléptethetnénk", null);
    return done(null, user);
});

app.use(session({
    secret: 'bLTMrJu2gqwWTdldvbaQ6bGK1B3AOuUp',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', require('./controllers/users'));
app.use('/api/trips', require('./controllers/trips'));

app.use((req, res, next) => {
    console.log('404');
    res.status(404).send('Error: 404 Page Not Found!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});