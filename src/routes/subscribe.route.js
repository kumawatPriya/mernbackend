const express = require('express');
const router = express.Router()
const controller = require('../controllers/subscriber.controller');

router.post('/subscribe', controller?.Subscribe);

module.exports = router;
