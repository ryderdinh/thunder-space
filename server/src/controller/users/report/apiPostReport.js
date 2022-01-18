const Report = require("../../../models/Report")

module.exports = async  (req, res, next) => {
    try {
        const report = await new Report({
            ...req.body,
            owner : req.user._id
        })
        const validateReport = await report.validateSync()
        if(!validateReport){
            return res.status(200).send( await report.save())
        }
        return res.status(401).send({ status : 'request is not validated' })
    } catch (error) {
        console.log(error);
        return res.status(400).send({ status : 'some thing went wrong' })
    }
}
