const Staff = require("../../../models/Staff")
const Project = require("../../../models/Project")
const Response = require("../../../models/Response");
const Notification = require("../../../models/Notification");
const { options } = require("joi");
module.exports = async(req, res, next) => {
    try {
        const uid = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const notifications = (await Staff.findOne({ _id: uid }).populate({
            path: "notifications",
            options: {
                limit: 10,
                skip: page === 1 ? 0 : page*10
            }
        })).notifications
        return res.status(200).send(new Response(200, "success", notifications))
    } catch (error) {
        if(error) return res.status(400).send(new Response(400, error.message))
    }
}