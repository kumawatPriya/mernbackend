const express = require('express');
const router = express.Router();
const controller = require("../controllers/PackageDetails.controller");

router.post('/createPackageDetails', controller?.CreatePackageDetails);
router.get('/getPackageDetails', controller?.GetPackageDetails);

module.exports = router;

