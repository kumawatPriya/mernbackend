const packageDetailsSchema = require("../models/PackageDetailsSchema.model");
const HolidayPackagesSchema = require("../models/holidayPackageSchema.modal");
const specialPackageSchema = require("../models/specialPackageSchema.model")

exports.CreatePackageDetails = async (req, res) => {
  const { packageId } = req.body;
  if (!packageId) {
    return res.status(400).json({
      success: false,
      message: "Package not found!",
    });
  }
  try {
    const newDetails = new packageDetailsSchema(req.body);
    const saved = await newDetails.save();

    res.status(201).json({
      status: 200,
      message: "Package details added successfully.",
      data: saved,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong while creating detailed package.",
      error: error.message,
    });
  }
};

exports.GetPackageDetails = async (req, res) => {
  const { packageId } = req.query;
  if (!packageId) {
    return res.status(400).json({
      status: 400,
      message: "Missing packageId in query",
    });
  }

  try {
     const numericId = Number(packageId);
    // console.log("Looking for packageId:", numericId);
   const packageCard = (await HolidayPackagesSchema.findOne({ id: numericId })) 
  || await specialPackageSchema.findOne({ id: numericId });
    if (!packageCard) {
      return res.status(404).json({
        status: 404,
        message: "Package not found.",
      });
    }
    const details = await packageDetailsSchema.findOne({ packageId: numericId });
    return res.status(200).json({
      status: 200,
      data: {
        ...packageCard.toObject(),
        details: details || {},
      },
    });
  } catch (error) {
   return res.status(500).json({
      status: 500,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
