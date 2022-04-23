const Staff = require("../../../models/Staff")
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
    try {
        const users = await Staff.find();
        const data = [];
    for (const user of users){
        data.push(user.getProfileToCreateProject());
    }
    return res.status(200).send(new Response(200, "success", data))
    } catch (error) {
        console.log(error)
        return res.status(400).send(new Response(400, "something went wrong"))
    }
}