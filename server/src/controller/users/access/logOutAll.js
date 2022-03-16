const Staff= require('../../../models/Staff')
module.exports = async (req, res, next) => {
    try {
        const _id = req.user._id
        const user = await Staff.findOne({ _id : _id })
        if(user){
           await Staff.findByIdAndUpdate(_id, { tokens : [] } , { new : true })
           return res.status(200).send({
               status : 200,
               data : "success"
           })
        }
        return res.status(401).send({
            status: 401,
            error: "unauthorized",
          });
    } catch (error) {
        res.status(400).send({
            status : 400,
            error : "something went wrong"
          })
    }
}