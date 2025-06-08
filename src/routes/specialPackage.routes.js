const express = require('express');
const router = express.Router();
const controller = require('../controllers/specialPackage.controller');

router.post('/createPackage',controller.createPackage);

router.get('/getPackage', controller.getSpecialPackages);
console.log('controller called' ,controller )

module.exports = router;