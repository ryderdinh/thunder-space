const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const { func } = require("joi");
const Schema = mongoose.Schema ;

const Staff  = new Schema({
    email : { type: String, required:true },
    password : { type: String, required:true },
    name : {type : String , required : true},
    birthday : {type : String, required : true},
    position : {type : String, required : true},
    department : {type : String, required : true},
    phonenumber : { type: String, required : true },
    tokens : [
        {
            token : { type : String }
        }
    ],
    avatar : {
        public_id : {type : String, default: ""},
        url : {type: String, default : "https://res.cloudinary.com/dawqbbo2l/image/upload/v1626963206/avatar/avatar-none_byqbnn.svg"}
    },
    otp : { type : String, default : ''},
    otpExpiration : {type: Number, default : 0},
    confirmEmailExpiration : { type : Date, default : 0 },
}, {
    timestamps : { currentTime : () => Math.floor(Date.now() / 1000) }
});

    Staff.virtual('reports', {
        ref : 'Report',
        localField : '_id',
        foreignField : 'owner' 
    })

    Staff.virtual('projects', {
        ref : 'Project',
        localField : '_id',
        foreignField : 'member.uid'
    })

    Staff.virtual('notifications', {
        ref : 'Notification',
        localField : '_id',
        foreignField : 'owner'
    })
    Staff.methods.getProfile = function(){
        let userObject = this.toObject()
        delete userObject.password
        delete userObject.tokens
        delete userObject.confirmEmailExpiration
        delete userObject.resetToken
        delete userObject.resetTokenExpiration 
        delete userObject.otp
        delete userObject.otpExpiration
        userObject.avatar = userObject.avatar.url
        return userObject
    }
    Staff.methods.getProfileToCreateProject = function(){
         let userObject = this.toObject()
         delete userObject.phonenumber
         delete userObject.department
         delete userObject.position
         delete userObject.birthday
         delete userObject.password
         delete userObject.tokens
         delete userObject.confirmEmailExpiration
         delete userObject.resetToken
         delete userObject.resetTokenExpiration 
         delete userObject.otp
         delete userObject.otpExpiration
         delete userObject.createdAt
         delete userObject.updatedAt
         delete userObject.__v
         userObject.avatar = userObject.avatar.url
         return userObject
    }


    Staff.methods.generateToken = async function(password){
        try {
            const validPass = await bcrypt.compare(password, this.password)
            console.log(validPass);
            if(validPass){
               const token = await jwt.sign({_id : this._id.toString()}, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn : '60m'
                })
                return token
            }
            return null
        } catch (error) {
            return null
        }
    }

    Staff.pre("save", function (next) {
        const staff = this
        bcrypt.hash(staff.password, 10, (err,hash) =>{
            staff.password = hash
            next()
        })
    })


module.exports = mongoose.model("Staff ",Staff)