const router = require("express").Router()
const Staff = require("../../../models/Staff")
const bcrypt = require("bcrypt")
const { reset } = require("nodemon")
router.post("/newPassword/:resetToken", async (req, res, next) => {
    const resetToken = req.params.resetToken
    const resetPassword = req.body.resetPassword.trim()
    const confirmResetPassword = req.body.confirmResetPassword.trim()
   if(resetPassword === confirmResetPassword && resetPassword.length >= 6){
    Staff.findOne({
        resetToken : resetToken,
        resetTokenExpiration : { $gte :  Date.now() }
    })
    .then(resetUser=> {
        console.log(resetUser);
        resetUser.password = resetPassword
        resetUser.resetToken = undefined
        resetUser.resetTokenExpiration = undefined
        resetUser.token = undefined
        return resetUser.save()
    })
    .then(result => {
        return res.json({
            data : {
                status : 'Reset password successfully !'
            }
        })
    })
    .catch(err => {
        console.log(err);
        return res.json({
            data : {
                status : 'Something went wrong !'
            }
        })  
    })
   }else{
       return res.json({
           data : {
               status : 'Reset password is invalid !'
           }
       })
   }
  
})

module.exports = router