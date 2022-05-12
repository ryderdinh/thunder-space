const { Result } = require('express-validator')
const { object, required } = require('joi')
const mongoose = require('mongoose')
const { logger } = require('../../config/nodeMailer/email')
const Schema = mongoose.Schema

const Project = new Schema({
    code : { type : String, required : true, unique : true, uppercase : true },
    seqcode : { type: Number, required: true, default : 0 },
    name : { type: String, required : true },
    description : { type: String },
    member : [
        {
            uid: {type: mongoose.Schema.Types.ObjectId, ref: 'Staff'},
            role: { type: String, enum: ['manager', 'normal'] , required: true},
            name: {type: String, required: true},
            email: { type: String, required: true },
            avatar: {type: String, required: true}
        }
    ],
    issue : [
        {
            iid : {type :mongoose.Schema.Types.ObjectId, ref : "Issue" }
        }
    ],
    createdAt : { type: Number, default: Date.now(), required : true },
    updateAt : { type: Number, default: Date.now(), required: true },
    deleted : { type: Boolean, default: false, required: true }
})

Project.pre("save", function(next){
    const project = this;
    project.updateAt = Date.now()
    next()
})

Project.virtual('members', {
    ref : 'Staff ',
    localField : 'member.uid',
    foreignField : '_id'
})

Project.virtual("issues", {
    ref : "Issue",
    localField : "issue.iid",
    foreignField : "_id"
})

Project.methods.getProjectDetails = async function(issues){
    let objectProject = this.toObject();
    delete objectProject.__v
    delete objectProject.deleted
    delete objectProject.seqcode
    objectProject.issue = issues
    return objectProject
}

Project.methods.getManagers = function() {
    const mem = this.member.filter(e => e.role === "manager")
    this.member = mem
    return this
}

Project.methods.getNormalMembers = function() {
    const mem = this.member.filter(e => e.role === "normal")
    this.member = mem
    return this
}

Project.methods.getDetails = function(members){
    let objectProject = this.toObject()
    objectProject.member = []
  members.forEach( async (member) => {
      const user = await member.getProfile()
    objectProject.member.push(user)
  })
return objectProject
}
    module.exports = mongoose.model("Project", Project)