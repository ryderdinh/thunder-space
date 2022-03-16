const Staff = require('../../../models/Staff')
module.exports = async (req, res, next) => {
    try {
        const user = await Staff.findOne({ _id : req.user.id })
        if(user){
            let newTokens = user.tokens.filter(token => token.token != req.token)
            await Staff.findByIdAndUpdate(req.user.id, {tokens : newTokens}, { new : true })
            return res.status(200).send({
                status : 200,
               data : "success"
            })
        }
        return res.status(401).send({
            status: 401,
            error: "unauthorize",
          });
    } catch (error) {
        res.status(400).send({
            status : 400,
            error : "something went wrong"
          })
    }
}