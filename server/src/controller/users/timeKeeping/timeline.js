const TimeSheet = require("../../../models/TimeSheet");
const Response  = require("../../../models/Response")
module.exports = async (req, res) => {
    try {
        const userId = req.user.id;
        const existTimeSheet = await TimeSheet.findOne({ owner: userId });
        if (!existTimeSheet)
            return res.status(404).send(new Response(400, "data not found"));
        return res.status(200).send(new Response(200, "success", existTimeSheet.timeline))
    } catch (err) {
        if (err)
            return res.status(400).send(new Response(400, err.message));
    }
};
