const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Event = new Schema({ 
    name : {type: String, require:"true", default:"Mai tang thang quang anh"},
    date : { type: String, require:"true" },
    event_detail : {  
        hours : { type :String, require : "true" }, 
        position : { type : String, require : "true" }, 
        content : { type : String, require : "true" }, 
    }
 })

 module.exports = mongoose.model("Event", Event)
