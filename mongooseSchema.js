const mongoose = require('mongoose')

const accountInfo = mongoose.Schema({
    email:{
        type: String
    },
    password:{
        type: String
    }
});

const userInfo = new mongoose.model("/accounts", accountInfo);
module.exports = userInfo