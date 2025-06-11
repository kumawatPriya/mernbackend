const ContactMessage = require("../models/ContactMessage.Schema");


exports.saveContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, selectedDate, message } = req.body;
    
    const newMessage = new ContactMessage({
      firstName,
      lastName,
      email,
      phone,
      selectedDate,
      message
    });

    await newMessage.save();
    res.status(200).json({ status: "success", message: "Thank you for reaching out to us. We will get in touch with you soon." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal server error." });
  }
};
