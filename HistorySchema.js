const mongoose = require('mongoose');

const HistorySchema = mongoose.Schema({
    image:{
        type:String
    },
    title:{
        type: String
    },
    subtitle:{
        type: String
    },
    destination:{
       type: String
    },
    days:{
        type: String
    },
    price:{
        type: String
    },
    button:{
        type: String
    }
});

const deletedPackageHistory = new mongoose.model("/history", HistorySchema);
module.exports = deletedPackageHistory