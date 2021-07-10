const mongoose = require("mongoose")
const Schema = mongoose.Schema

const History = new Schema({
    email : { type : String, require : true },
    status : { type : String, require : true },
    type :{ type : String, require : true },
    details : {
        day :{ type : String, require : true }, 
        time :{ type : String, require : true },
    }
})

module.exports = mongoose.model("History", History)