const { object } = require("joi")
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
        project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
        creator : { type : mongoose.Schema.Types.ObjectId , ref : "Staff ", required : true },
        assign : { type : mongoose.Schema.Types.ObjectId, ref: "Staff " },
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
        history : [
            {
                user: [{
                    uid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Staff " }
                }],
                time: { type: Number, required: true },
                action: { type: String, required: true }
            }
        ],
        createdAt : { type : Number, default :Date.now(), required : true },
        updateAt : { type : Number, default: Date.now(), required: true }
})

Issue.virtual('creators', {
    ref : 'Staff ',
    localField : 'creator',
    foreignField : '_id'
})

Issue.virtual("assigns", {
    ref : 'Staff ',
    localField : 'assign',
    foreignField : '_id'
})

Issue.methods.getIssueDetails = function(creator, assign){
    const objectIssue = this.toObject();
    objectIssue.creator = creator;
    objectIssue.assign = assign;
    return objectIssue
}



Issue.methods.getIssueDetailsWithHistory = function(creator, assign, history){
    const objectIssue = this.toObject();
    objectIssue.history = history;
    objectIssue.creator = creator;
    objectIssue.assign = assign;
    return objectIssue
}
Issue.virtual("actionUsers", {
    ref: "Staff ",
    localField : "history.user.uid",
    foreignField: "_id"
})

Issue.pre("save", function(next){
    const issue = this;
    issue.updateAt = Date.now();
    next();
})

module.exports = mongoose.model("Issue", Issue)