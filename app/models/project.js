const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Project = new Schema({
    pid : {type : String, required : true, unique : true},
    code : { type : String, required : true, unique : true },
    name : { type: String, required : true },
    manager : [
        {
            uid : { type : String, required : true, unique :true },
            name : { type : String, required : true },
        }
    ],
    member : [
        {
            uid : {type : String, unique : true},
            name : {type : String}
        }
    ],
    issue : [
        {
            iid : { type: String, unique : true },
            name : String,
            type : {
                type : String,
                enum : {
                    values : [ 'task', 'bug' ],
                    message : '{VALUE}  is not supported'
                }
            }
        }
    ]
    
})

module.exports = mongoose.model("Project", Project)