const Staff = require('../../../models/Staff')
module.exports = async (req, res) => {
    try {
        const _id = req.user._id
        const user = await Staff.findById(_id)
        if(user){
            const populateReports = await user.populate('reports')
            return res.status(200).send(populateReports.reports.map(report => report.reportDetails()))
        }
        return res.status(400).send({ status : 'failure' })
    } catch (error) {
        console.log(error);
        res.status(400).send({ status : 'failure' })
    }
}

