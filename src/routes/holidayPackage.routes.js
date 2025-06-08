const express = require('express');
const router = express.Router();
const controller = require('../controllers/holidayPackage.controller');

router.post('/createholidayPackage', controller?.createHolidayPackage);
router.get('/getHolidayPackages', controller?.getHolidayPackages);
router.delete('/deleteHolidayPackage', controller?.getHolidayPackages)

module.exports = router;
