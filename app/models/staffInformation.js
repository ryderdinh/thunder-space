const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema ;

const StaffInformation  = new Schema({
    email : { type: String, required:true },
    password : { type: String, required:true },
    name : {type : String , required : true},
    birthday : {type : String, required : true},
    position : {type : String, required : true},
    department : {type : String, required : true},
    phonenumber : { type: String },
    token : { type : String },
    resetToken : { type : String },
    resetTokenExpiration : { type : Date },
    avatar : {
        public_id : {type : String, default: ""},
        url : {type: String, default : "https://res.cloudinary.com/dawqbbo2l/image/upload/v1626963206/avatar/avatar-none_byqbnn.svg"}
    }
});
    StaffInformation.pre("save", function (next) {
        const staff = this
        bcrypt.hash(staff.password, 10, (err,hash) =>{
            staff.password = hash
            next()
        })
    })


module.exports = mongoose.model("Staff_information ",StaffInformation)