const Staff = require('../../../models/Staff')
const Response = require("../../../models/Response")
module.exports = async (req, res, next) => {
    try {
        const user = await Staff.findOne({ _id : req.user.id })
        if(user){
            let newTokens = user.tokens.filter(token => token.token != req.token)
            await Staff.findByIdAndUpdate(req.user.id, {tokens : newTokens}, { new : true })
            return res.status(200).send(new Response(200, "success"))
        }
        return res.status(401).send(new Response(401, "unauthorize"));
    } catch (error) {
        res.status(400).send(new Response(400, "something went wrong"))
    }
}