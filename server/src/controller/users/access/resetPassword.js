const Staff = require("../../../models/Staff")
module.exports = async (req, res, next) => {
    try {
        const { password, confirmPassword } = req.body
        const resetToken = req.params.resetToken
        const staff = await Staff.findOne({
            resetToken : resetToken,
            resetTokenExpiration : { $gte :  Date.now() }
        })
        console.log(staff);
        if(staff){
            if(password === confirmPassword && password.length >= 6){
                staff.password = password
                staff.resetToken = process.env.DEFAULT_RESET_TOKEN
                staff.resetTokenExpiration = 0
                staff.save()
                return res.status(200).send({ data : 'success' })
            }
        }
        return res.status(401).send("unauthorize")
    } catch (err) {
        return res.status(400).send("some thing went wrong")
    }
  
}
