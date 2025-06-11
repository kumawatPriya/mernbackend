const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  selectedDate: { type: Date, required: true },
  message: { type: String}
}, { timestamps: true });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
