const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const allowedCategories = [
  "hill_station",
  "wildlife",
  "beach",
  "pilgrimage",
  "heritage",
  "honeymoon",
  "adventure",
  "trekking"
];
const PackagesByInterest = mongoose.Schema({
    category: {type: String, required: true, enum: {values: allowedCategories, message: 'Invalid category!'}},
    image: {type: String, required: true},
    title: {type: String, required: true},
    duration: {type: String, required: true},
})
PackagesByInterest.plugin(AutoIncrement,{inc_field: "PackId", start_seq: 1})
PackagesByInterest.set('toJSON',{
    transform: function(doc, ret){
        delete ret._id;
        delete ret.__v
    }
})


const PackagesbyInterestSchema = mongoose.model('InterestedPackages', PackagesByInterest);
module.exports = {PackagesbyInterestSchema, allowedCategories}

