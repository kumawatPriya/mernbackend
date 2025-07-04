const express = require('express');
const router = express.Router();
const controller = require("../controllers/PackageDetails.controller");

router.post('/createPackageDetails', controller?.CreatePackageDetails);
router.get('/getPackageDetails', controller?.GetPackageDetails);
router.put('/update-details', controller?.UpdatePackageDetails); 

module.exports = router;

