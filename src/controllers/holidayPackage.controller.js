const holidayPackagesSchema = require('../models/holidayPackageSchema.modal');
const deletedPackageSchema = require('../models/DeletedPackageSchema.model');

exports.createHolidayPackage = async(req, res)=>{
      const {title, price} = req.body;

      if(!title || !price){
        res.status(422).json({
            success: false,
            message: 'Title and price are the required filed.'
        })
      }
      try{
            const newcard =  holidayPackagesSchema(req.body);
            const saved = await newcard.save();
            res.status(201).json({
                success: true,
                message: 'Package created successfully',
                data: saved
            })
            console.log(saved, 'holidaypackageSaved')
      }catch(error){
        res.status(500).json({
            success: false,
            meassage: 'Something went wrong while creting the package',
            error: error.meassage
        })
      }
}

exports.getHolidayPackages = async(req, res)=>{
    try{
        const holidaycards =  await holidayPackagesSchema.find();
        res.status(200).json({
            success: true,
            data: holidaycards
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error in fetching Packages!',
            error : error.message
        })
    }
}

exports.deleteHolidayPackages = async(req,res)=>{
    const {id} = req.params;
     try{
        const PackageToDelete = await holidayPackagesSchema.findById(id);

        if(!PackageToDelete){
            return res.status(404).json({
                success: false,
                message: 'Package not found'
            })
        }
        const deleteData = new deletedPackageSchema(PackageToDelete.toObject());
        await deleteData.save();

        await holidayPackagesSchema.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Package deleted successfully.'
        })
     }catch(error){
        res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting the package.',
            error: error.meassage
        })
     }
}