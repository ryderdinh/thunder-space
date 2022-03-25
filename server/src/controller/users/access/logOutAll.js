const Staff= require('../../../models/Staff')
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
    try {
        const _id = req.user._id
        const user = await Staff.findOne({ _id : _id })
        if(user){
           await Staff.findByIdAndUpdate(_id, { tokens : [] } , { new : true })
           return res.status(200).send(new Response(200, "success"))
        }
    } catch (error) {
        res.status(400).send(new Response(400, "something went wrong"))
    }
}