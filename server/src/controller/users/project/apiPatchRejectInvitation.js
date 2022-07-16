const Staff = require("../../../models/Staff")
const Project = require("../../../models/Project")
const Response = require("../../../models/Response");
const Notification = require("../../../models/Notification");
module.exports = async(req, res, next) => {
    try {
        const uid = req.user._id;
        const pid = req.params.pid;
        const project = await Project.findById(pid);
        let checkInvitation = false
        let indexGuest
        for (let i = 0; i < project.guest.length; i++) {
                if(project.guest[i].uid.toString() === uid.toString()){
                        checkInvitation = true;
                        indexGuest = i;
                        i = project.guest.length;
                    }
                }
                if(!checkInvitation) return res.status(400).send(new Response(400, 'action is not valid'));
                project.guest.splice(indexGuest, 1);
                await project.save()
                await Notification.deleteOne({ owner: uid, "data.pid" : pid})
                return res.status(200).send(new Response(200, 'success'));
    } catch (error) {
        if(error) return res.status(400).send(new Response(400, error.message))
    }
}