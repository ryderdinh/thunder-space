const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const moment = require("moment")

const Status = new Schema({
    statusDay : {type: String, default: "1"},
    timeStart : { type:String, default: "" } ,
    timeEnd :  { type:String, default: "" },
    timeLine : [],
    confirmEmail : {type : Boolean, default : false},
    confirmEmailExpiration : { type : Date, default : Date.now() + 3600000 },
})
module.exports = mongoose.model("status",Status)