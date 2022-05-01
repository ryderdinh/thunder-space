const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Issue = new Schema({
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
          id :  { type : mongoose.Schema.Types.ObjectId , ref : "Staff", required : true}
        },
        assign : {
          id :  { type : mongoose.Schema.Types.ObjectId, ref: "Staff", required : true }
        },
        estimate : {
            start :{ type : Number }, 
            end : { type: Number}
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
        createdAt : { type : Number, default :Date.now(), required : true },
        updateAt : { type : Number, default: Date.now(), required: true }
})

Issue.virtual("creators", {
    ref : "Staff",
     localField : "creator.id",
     foreignField : "_id"
})

Issue.virtual("assigns", {
    ref : "Staff",
    localField : "assign.id",
    foreignField : "_id"
})
Issue.pre("save", function(next){
    const issue = this;
    issue.updateAt = Date.now();
    next();
})
    module.exports = mongoose.model("Issue", Issue)