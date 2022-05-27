const Issue = require("../../../models/Issue")
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
    try {
        const iid = req.params.iid;
        const uid = req.user.id;
        const issueDeleted = await Issue.findOneAndDelete({ _id: iid, "creator": uid })
        if(!issueDeleted) return res.status(400).send(new Response(400, "can not find issue to delete"));
        return res.status(200).send(new Response(200, "success", issueDeleted))
    } catch (err) {
        return res.status(400).send(new Response(400, "something went wrong"))
    }
}