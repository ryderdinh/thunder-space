const router = require("express").Router()
const Staff = require("../../../models/staffInformation")
const nodemailer = require("nodemailer")
const sendgridTransport = require("nodemailer-sendgrid-transport")

const transporter = nodemailer.createTransport(
    sendgridTransport({
    auth : {
        api_key: "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"
    }
}))
const { v4: uuidv4 } = require('uuid');
router.post("/resetPassword", async (req, res, next) => {
    const resetToken = uuidv4()
    Staff.findOne({
        email : req.body.email
    })
    .then(user => {
        if(!user){
            return res.json({ 
                data : {
                    status : "Email is not available !"
                }
            })
        }
        user.token = ""
        user.resetToken = resetToken
        user.resetTokenExpiration = Date.now() + 3600
        return user.save()
    })
    .then(result => {
        transporter.sendMail({
            to : result.email,
            from : "boypham1234567@gmail.com",
            subject : "RESET PASSWORD",
            html : `
                <p>You request to reset password</p>
                <a href="http://localhost:3000/api/newPassword/${resetToken}">CLick this link to reset password</a>
            `
        })
        return res.json({
            data : {
                status : "Check your email to reset password !" 
            }
        })
    })
    .catch(err => {
        console.log(err);
            return res.json({
                data : {
                    status : "Something went wrong !"
                }
            })
    })

})

module.exports = router