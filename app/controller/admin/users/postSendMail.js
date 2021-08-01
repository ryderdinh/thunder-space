
const StaffInformation = require ("../../../models/staffInformation")
const Status = require( "../../../models/status" )
const TableOfWork = require ("../../../models/tableOfWork")
const Report = require("../../../models/report") 
const { authSchema } = require("../../../../middleware/admin/form/checkFormRegister")
const { convert } = require("../../../utils/dateFormat")
const checkAuthenticated = require("../../../../middleware/admin/login/checkAuthenticated")
const express  = require("express")
const router = express.Router()
const transporter = require("../../../../config/sendGrid")

router.post("/sendMail", checkAuthenticated, async (req, res, next)=> {
     try{
          //validate newmember
          // req.body.birthday = convert(req.body.birthday)
          console.log(req.body.birthday);
          const result = await authSchema.validateAsync(req.body)
          console.log(result);
          //Check email exist
          const emailExist = await StaffInformation.findOne({ email: req.body.email })
          if (emailExist)  {
            req.flash('createUserFailed', "Email hasbeen created")
           res.redirect("/admin/createUser")
          }else{
            const send = await  transporter.sendMail({
                    to : result.email,
                    from : "boypham1234567@gmail.com",
                    subject : "CONFIRM EMAIL",
                    html : `
                    <form action="/confirmEmail" method : "POST">
                    <input type="hidden"  name="fname" value="John"><br>
                    <input type="hidden" id="lname" name="lname" value="Doe">
                    <input type="submit" value="CLick this to confirm email">
                  </form>
                    `
                })
          }

            req.flash('createUserSuccess'," Waiting user to confirm email !")     
            res.redirect("/admin/createUser")
        }catch(err){
             console.log(err);
             if (err.isJoi === true || err) {
               req.flash('createUserFailed', `${err}`);
                res.redirect("/admin/createUser")
             } 
             next()
          } 
     
})

module.exports = router