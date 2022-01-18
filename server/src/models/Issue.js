const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Issue = new Schema({
        iid : { type: String, required : true},
        name : { type : String, required : true },
        code : { type : String , required : true, unique : true },
        type : {
            type : String,
            required : true,
            enum : {
                values : [ 'task', 'bug' ],
                message : '{VALUE}  is not supported'
            }
        },
        creator :{
            uid : { type : String, required : true },
            name : { type : String, required :true },
        },
        assign : {
            uid : { type : String, required : true  },
            name : { type : String, required : true },
        },
        estimate : {
            start : String, 
            end : String
        },
        description : String,
        priority : { 
            type : String,
            enum : {
                values : [ 'low', 'medium', 'high', 'highest' ],
                message : '{VALUE}  is not supported'
            },
            required : true
        },
        attachment : [],
        status : [],
        history : [],
        createdAt : { type : Number, default :Date.now, required : true }
    
})


module.exports = mongoose.model("Issue", Issue)