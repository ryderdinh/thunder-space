const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Issue = new Schema({
    iid : {type : String, required : true},
    code :  { type : String, require : true },
    description :  { type : String},
    type : {
        type : String,
        enum : {
            values : [ 'task', 'bug' ],
            message : '{VALUE}  is not supported'
        }
    },
    creator :{
        uid : { type : String, required : true },
        name : { type : String, required :true }
    },
    assign : {
        uid : { type : String, required : true  },
        name : { type : String, required : true }
    },
    estimate : {
        start : String, 
        end : Stirng
    },
    priority : { 
        type : String,
        enum : {
            values : [ 'low ', 'medium', 'high', 'highest' ],
            message : '{VALUE}  is not supported'
        },
        required : true
    },
    attachment : [],
    status : [],
    history : []

})