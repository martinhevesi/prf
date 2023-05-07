const mongoose = require('mongoose');
const User = mongoose.model('user');

async function ensureAdminExists() {
  try {
    const admin = await User.findOne({ role: 'admin' });
    if (admin) { 
      console.log('Az admin felhasználó már megtalálható az adatbázisban!');
    } else {
      const newAdmin = new User({
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        birthdate: new Date(),
      });
      await newAdmin.save();
      console.log('Az admin felhasználó sikeresen létrehozva!');
    }
  } catch (error) {
    console.error('Hiba történt az admin ellenőrzése vagy létrehozása során: ', error);
  }
}

module.exports = ensureAdminExists;