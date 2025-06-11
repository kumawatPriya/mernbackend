const subscriberSchema = require('../models/subscriberSchema.model');

exports.Subscribe = async(req, res)=>{
     const {email} = req.body;

     if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
         return res.status(400).json({
            message: 'Invalid Email Address'
         })
     }
     try{
        const existing = await subscriberSchema.findOne({email});
        if(existing){
            return res.status(200).json({
                message: 'You are already subscribed!'
            })
        }
        await subscriberSchema.create({email});
        res.status(200).json({
            message: 'Thank you for subscribing!'
        })

     }catch(error){
        res.status(500).json({
            status: 500,
            message: 'Something went wrong!',
            error: error.message
        })
     }
}