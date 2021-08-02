const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Project = new Schema({
    pid : {type : String, required : true, unique : true},
    code : { type : String, required : true, unique : true },
    name : { type: String, required : true },
    manager : [
        {
            uid : { type : String, required : true },
            name : { type : String, required : true },
        }
    ],
    member : [
        {
            uid : {type : String},
            name : {type : String}
        }
    ],
    issueData : [
        {
            iid : { type: String},
            issueName : String,
            issueType : {
                type : String,
                enum : {
                    values : [ 'task', 'bug' ],
                    message : '{VALUE}  is not supported'
                }
            },
            issueCreator :{
                uid : { type : String, required : true },
                name : { type : String, required :true }
            },
            issueAssign : {
                uid : { type : String, required : true  },
                name : { type : String, required : true }
            },
            issueEstimate : {
                start : String, 
                end : String
            },
            issuePriority : { 
                type : String,
                enum : {
                    values : [ 'low ', 'medium', 'high', 'highest' ],
                    message : '{VALUE}  is not supported'
                },
                required : true
            },
            issueAttachment : [],
            issueStatus : [],
            issueHistory : []
        }
    ]
    
})

module.exports = mongoose.model("Project", Project)