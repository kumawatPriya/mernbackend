const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const specialPackage = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    destination: { type: String },
    image: { type: String },
    duration: { type: String },
    price: { type: Number, required: true },
    tagline: { type: String },
    rating: { type: Number },
    reviews: { type: String },
    //   userId: { type: Number, required: true }
  },
  { timestamps: true }
);
specialPackage.set("toJSON", {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

specialPackage.plugin(AutoIncrement, {inc_field: "id", start_seq: 101})
module.exports = mongoose.model("specialPackages", specialPackage);
