const mongoose = require('mongoose');

const CreateCards = mongoose.Schema({
    image:{ type:String},
    title:{ type: String },
    subtitle:{ type: String },
    destination:{ type: String },
    days:{ type: String },
    price:{ type: String },
    button:{ type: String }
})

const cards = new mongoose.model("/travelInfo", CreateCards);
module.exports = cards