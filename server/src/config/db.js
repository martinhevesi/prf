const mongoose = require('mongoose');
const dbUrl = 'mongodb+srv://hevesimartin:'+'pw' + '@prf.wzx7hsi.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB successfully!');
});

module.exports = mongoose;