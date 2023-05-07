const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  tripid: {
    type: String,
    required: true,
    unique : true
  },
  username: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  }
});


tripSchema.pre('save', function(next) {
  const trip = this;
  trip.tripid = mongoose.Types.ObjectId();
  console.log('generate id trip hook', trip);
  return next();
});

const Trip = mongoose.model('trip', tripSchema);

module.exports = Trip;