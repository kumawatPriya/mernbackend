const mongoose = require("mongoose");

// Schema for each image
const imageSchema = new mongoose.Schema({
  src: { type: String, required: true },
}, { _id: false });

// Schema for each highlight (as object)
const highlightSchema = new mongoose.Schema({
  text: { type: String, required: true }
}, { _id: false });

// Schema for each destination/stop
const descriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  duration: String,
  type: { type: String, enum: ['main', 'optional'], default: 'main' }
}, { _id: false });

const destinationPointsSchema = new mongoose.Schema({
  name: {type: String}
},{_id: false})

const includesSchema = new mongoose.Schema({
  item: {type:String}
},{_id: false})
const excludeSchema = new mongoose.Schema({
  item: {type:String}
},{_id: false})
const whatToBringSchema = new mongoose.Schema({
  item: {type:String}
},{_id: false})
const notAllowedSchema = new mongoose.Schema({
  item: {type:String}
},{_id: false})

const packageDetailsSchema = new mongoose.Schema({
  packageId: { type: Number, required: true, unique: true },

  highlights: [highlightSchema],

  fullDescription: [descriptionSchema],

  images: [imageSchema],

  destinationPoints: [destinationPointsSchema],

  includes: [includesSchema],
  exclusions: [excludeSchema],

  importantInformation: {
    whatToBring: [whatToBringSchema],
    notAllowed: [notAllowedSchema]
  }
}, { timestamps: true });

packageDetailsSchema.set('toJSON', {
  transform: function(doc, ret){
      delete ret.packageId;
      delete ret.__v;
      delete ret._id;
  }
})

module.exports = mongoose.model("packageDetails", packageDetailsSchema);