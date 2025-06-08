const mongoose = require("mongoose");

const deletedHolidayPackagesSchema = mongoose.Schema({
  image: { type: String },
  title: { type: String },
  subtitle: { type: String },
  destination: { type: String },
  duration: { type: String },
  price: { type: String },
  tagline: { type: String },
  rating: { type: Number },
  reviews: { type: String },
});

const deletedCards = mongoose.model('deletedPackages', deletedHolidayPackagesSchema);
module.exports = deletedCards
