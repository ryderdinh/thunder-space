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
    confirmEmail : {type : Boolean, default : false},
    confirmEmailExpiration : { type : Date, default : Date.now() + 3600000 },
    avatar : {
        public_id : {type : String, default: ""},
        url : {type: String, default : "https://res.cloudinary.com/dawqbbo2l/image/upload/v1626963206/avatar/avatar-none_byqbnn.svg"}
    },
    // pid :  {type : String, default: ""}
});
    StaffInformation.pre("save", function (next) {
        const staff = this
        bcrypt.hash(staff.password, 10, (err,hash) =>{
            staff.password = hash
            next()
        })
    })


module.exports = mongoose.model("Staff ",StaffInformation)