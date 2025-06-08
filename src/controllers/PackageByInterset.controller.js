const {PackagesbyInterestSchema, allowedCategories} = require('../models/PackagesByInterestSchema.model');
console.log(allowedCategories, 'allowedcategories')

exports.createIntrestedPackage = async(req, res)=>{
    const {category, image, title, duration} = req.body;
    if( !category || !image || !title || !duration){
        return res.status(400).json({status: 400, message: 'All fields are required!'});
    };
     if (!allowedCategories.includes(category)) {
    return res.status(400).json({
      success: false,
      message: `Invalid category. Allowed categories are: ${allowedCategories.join(", ")}`
    });
  }
    try{
           const newPackage = new PackagesbyInterestSchema({category, title, image, duration})
           await newPackage.save();
           return res?.status(201).json({
              status: 200,
              message: `Package created for ${category}.`,
              data: newPackage
           })
    }catch(error){
        return res.status(500).json({
            status: 500,
            message: 'Something went wrong while creating packages!',
            error: error?.message
        })
    }
}

exports.getInterestedPackage = async(req, res)=>{
       const {category} = req.query;
       if(!category){
        return res.status(400).json({
            status: 400,
            message: 'Category is required'
        })
       }
       try{
             const packages = await PackagesbyInterestSchema.find({category: category});
            res.status(200).json({
                status: 200,
                data: packages
            })
       }catch(error){
         res.status(500).json({
            status: 500,
            message: 'Something went wrong while fetching packages!',
            error: error.message
        })
       }
}

exports.getSpecificPackageById = async(req,res)=>{
     const {PackId} = req.query;

     if(!PackId){
        return res?.status(400).json({
            status: 400,
            message: 'Missing id in query!'
        })
     }
     try{
        const numericId = Number(PackId);
        const Package = await PackagesbyInterestSchema.findOne({PackId: numericId});
        if(!Package){
            return res.status(404).json({
                status: 404,
                message: 'Package not found'
            })
        }
      return res.status(200).json({
            status: 200,
            data: Package
        })
     }catch(error){
        return res.status(500).json({
            status: 500,
            message: 'Error in fetching package!',
            error: error.message
        })
     }
}

exports.updateInterestedPackage = async (req, res) => {
  const { PackId } = req.params;
  const { category, title, image, duration } = req.body;

  if (!PackId) {
    return res.status(400).json({ status: 400, message: 'Package ID is required.' });
  }

  try {
    const updatedPackage = await PackagesbyInterestSchema.findOneAndUpdate(
       { PackId: parseInt(PackId) },  
      { category, title, image, duration },
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ status: 404, message: 'Package not found.' });
    }

    return res.status(200).json({
      status: 200,
      message: 'Package updated successfully.',
      data: updatedPackage
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong while updating the package.',
      error: error.message
    });
  }
};