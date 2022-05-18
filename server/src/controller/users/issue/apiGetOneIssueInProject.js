const router = require("express").Router
const Response = require("../../../models/Response")
const Issue = require("../../../models/Issue")
const Project = require("../../../models/Project")
module.exports = async (req, res, next) => {
    try {
        const pid = req.params.pid;
        const iid = req.params.iid
        const uid = req.user.id
        // //Check exist project
        const existProject = await Project.findOne({ $and: [
            { _id: pid },
            { deleted: false },
            { member: { $elemMatch : { uid: uid } } },
            { issue: { $elemMatch : { iid: iid } } }
        ] })
        if(!existProject) {
            return res.status(400).send(new Response(400, "project is not available"))
        }else{
            return res.status(200).send(new Response(200, 'success', await Issue.findById(iid)))
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send(new Response(400, "something went wrong"))
    }
}