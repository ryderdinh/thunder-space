const Staff = require("../../../models/Staff")
const Project = require("../../../models/Project")
const Response = require("../../../models/Response");
const Notification = require("../../../models/Notification");
module.exports = async(req, res, next) => {
    try {
        const uid = req.user.id;
        const user = await Staff.findById(uid);
        const notifications = (await user.populate('notifications')).notifications
        return res.status(200).send(new Response(200, "success", notifications))
    } catch (error) {
        if(error) return res.status(400).send(new Response(400, error.message))
    }
}
