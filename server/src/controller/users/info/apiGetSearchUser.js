const Staff = require("../../../models/Staff")
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
    try {
        const email = req.query.email || null ;
        if(email){
            const re = new RegExp(email)
            const users = await Staff.find({ email: { $regex: re } })
            if(users.length === 0) return res.status(400).send(new Response(400, "user not found"));
            return res.status(200).send(new Response(200, users.map(user => user.getProfileToCreateProject())))
        }else{
            return res.status(400).send(new Response(400, "user not found"))
        }
    } catch (error) {
        return res.status(400).send(new Response(400, "something went wrong"))
    }
}