const express = require('express');
const controller = require("../controllers/PackageByInterset.controller");
const router = express.Router();

router.post('/createPackageByInterest', controller?.createIntrestedPackage);
router.get('/getInterestedPackage', controller.getInterestedPackage);
router.put('/updateInterestedPackage/:PackId', controller.updateInterestedPackage);
router.get('/getPackageDetailById', controller.getSpecificPackageById)

module.exports = router