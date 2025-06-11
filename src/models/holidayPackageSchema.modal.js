const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const holidayPackagesSchema = new mongoose.Schema(
  {
    image: { type: String },
    title: { type: String, required: true },
    subtitle: { type: String },
    destination: { type: String },
    duration: { type: String },
    price: { type: String, required: true },
    tagline: { type: String },
    rating: { type: Number },
    reviews: { type: String },
  },
  { timestamps: true }
);

// Custom JSON transformation to reorder keys
holidayPackagesSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;

    // Reorder keys: Put `id` first
    const reordered = {
      id: ret.id,
      image: ret.image,
      title: ret.title,
      subtitle: ret.subtitle,
      destination: ret.destination,
      duration: ret.duration,
      price: ret.price,
      tagline: ret.tagline,
      rating: ret.rating,
      reviews: ret.reviews,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };

    return reordered;
  },
});

// Apply auto-increment plugin only once
if (!mongoose.models.holidayPackages) {
  holidayPackagesSchema.plugin(AutoIncrement, {
    inc_field: "id",
    start_seq: 1,
    id: "holidayPackages_counter",
  });
}

// Prevent model re-declaration during dev
const holidayCards =
  mongoose.models.holidayPackages ||
  mongoose.model("/HolidayPackages", holidayPackagesSchema,"holidaypackages");

module.exports = holidayCards;
