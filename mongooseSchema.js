const mongoose = require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)

const accountInfo = mongoose.Schema({
    email:{type: String, required: true},
    password:{type: String, required: true},
    createdOn: {type: Date, default: Date.now}
});

accountInfo.plugin(AutoIncrement, {inc_field: 'userId'})
const userInfo = mongoose.model("User", accountInfo); 

module.exports = userInfo;
