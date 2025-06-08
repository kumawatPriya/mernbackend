const specialPackage = require("../models/specialPackageSchema.model");
const userInfo = require("../../mongooseSchema")

exports.createPackage = async (req, res) => {
  const { title, price,  } = req.body;
  if (!title || !price ) {
    return res.status(422).json({
      success: false,
      message: "Title, Price and userId are required field.",
    });
  }
  try {
    const newPackage = new specialPackage(req.body);
    const saved = await newPackage.save();
    res.status(201).json({
      success: true,
      message: "Package created successfully.",
      data: saved,
    });
    console.log(saved, 'CreatedPackage')
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the package.",
      error: error.message,
    });
  }
};

// for getSpecialPackage
exports.getSpecialPackages = async (req, res) => {
  try {
    const packages = await specialPackage.find();
    res.status(200).json({
      success: true,
      data: packages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching packages",
      error: err,
    });
  }
};
