const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shorUrl: String,
    date:{
        type:String,
        default:Date.now
    }
})