const express = require('express');
const router = express.Router();
const controller = require('../controllers/ContactMessage.controller');

router.post('/contact', controller?.saveContactForm);

module.exports = router;