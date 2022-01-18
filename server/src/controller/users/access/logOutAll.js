const Staff= require('../../../models/Staff')
module.exports = async (req, res, next) => {
    try {
        const _id = req.user._id
        const user = await Staff.findOne({ _id : _id })
        if(user){
           await Staff.findByIdAndUpdate(_id, { tokens : [] } , { new : true })
           return res.status(200).send()
        }
        return res.status(401).send("unauthorize")
    } catch (error) {
        res.status(400).send("some thing went wrong")
    }
}