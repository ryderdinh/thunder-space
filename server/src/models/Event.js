const { string } = require("joi")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Event = new Schema({ 
    name : {type: String, required : true},
    tag : String,
    date : { type: Number, required :true },
    event_detail : {  
        hours : { type :Number, required : true }, 
        position : { type : String, required : true }, 
        content : { type : String, required : true }, 
    }
 })

 module.exports = mongoose.model("Event", Event)
