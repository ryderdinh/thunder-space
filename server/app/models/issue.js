const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Issue = new Schema({
        iid : { type: String},
        issueName : String,
        issueCode : { type : String , required : true, unique : true },
        issueType : {
            type : String,
            enum : {
                values : [ 'task', 'bug' ],
                message : '{VALUE}  is not supported'
            }
        },
        issueCreator :{
            uid : { type : String, required : true },
            name : { type : String, required :true },
            email : { type : String, required :true },
            avatar : { type : String, required :true },
        },
        issueAssign : {
            uid : { type : String, required : true  },
            name : { type : String, required : true },
            email : { type : String, required : true },
            avatar : { type : String, required : true },
        },
        issueEstimate : {
            start : String, 
            end : String
        },
        issueDescription : String,
        issuePriority : { 
            type : String,
            enum : {
                values : [ 'low', 'medium', 'high', 'highest' ],
                message : '{VALUE}  is not supported'
            },
            required : true
        },
        issueAttachment : [],
        issueStatus : [],
        issueHistory : []
    
})

module.exports = mongoose.model("Issue", Issue)