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
            email : { type : String, required : true },
            avatar : { type : String, required :false },
        }
    ],
    member : [
        {
            uid : {type : String},
            name : {type : String},
            email : { type : String},
            avatar : { type : String}
        }
    ],
    issue : [
        {
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
        }
    ]
    
})

module.exports = mongoose.model("Project", Project)