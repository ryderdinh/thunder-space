const { date } = require("joi")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Report = new Schema ({
    userName : { type :String, require: "true" },
    reportDetails : [
        // {
        //     typeReport : {type : String, require:"true"},
        //     date : {
        //         dateStart : {type : String},
        //         dateEnd : {type : String},
        //     },
        //     content : {type: String, require:"true" }
        // }
    ],
    confirmEmail : {type : Boolean, default : false},
    confirmEmailExpiration : { type : Date, default : Date.now() + 3600000 },
})

module.exports = mongoose.model("Report",Report)