const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const tableOfWork = new Schema({
    dateDetails : [],
    confirmEmail : {type : Boolean, default : false},
    confirmEmailExpiration : { type : Date, default : Date.now() + 3600000 },
})

module.exports = mongoose.model("table_of_work",tableOfWork)