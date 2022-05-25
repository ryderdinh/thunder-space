const Issue = require("../../../models/Issue")
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
    try {
        const iid = req.params.iid;
        const uid = req.user.id;
        const name = req.body.name || "";
        const type = req.body.task || "";
        const end = req.body.end || "";
        const description = req.body.description || "";
        const priority = req.body.priority || "";
        const issue  = await Issue.findOne({ _id: iid, "creator.id": uid });
        name !== "" ? issue.name = name : null
        type !== "" ? issue.type = type : null
        end !== "" ? issue.estimate.end = end : null
        description !== "" ? issue.description = description : null
        priority !== "" ? issue.priority = priority : null
        return res.status(200).send(new Response(200, "success", await issue.save()))
    } catch (err) {
        console.log(err);
        return res.status(400).send(new Response(400, "something went wrong"))
    }
}