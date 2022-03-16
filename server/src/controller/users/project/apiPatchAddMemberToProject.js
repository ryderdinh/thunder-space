const Staff = require("../../../models/Staff")
const Project = require("../../../models/Project")

 module.exports = async(req, res, next) => {
     try {
        const userId = req.user.id
        const newMembers = req.body.user
        const existUser = await Staff.findById(userId)
        if(!existUser) return res.status(401).send("")
    } catch (error) {
         res.status(400).send("some thing went wrong")
     }
 }