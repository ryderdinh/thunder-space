
const StaffInformation = require ("../../../models/staffInformation")
const Status = require( "../../../models/status" )
const TableOfWork = require ("../../../models/tableOfWork")
const Report = require("../../../models/report") 
const bcrypt = require("bcrypt")
const { authSchema } = require("../../../../middleware/admin/form/checkFormRegister")
const { convert } = require("../../../utils/dateFormat")
const flash = require('express-flash')
const checkAuthenticated = require("../../../../middleware/admin/login/checkAuthenticated")
const express  = require("express")
const router = express.Router()

router.post("/storeUser", checkAuthenticated, async (req, res, next)=> {
     try{
          //validate newmember
          // req.body.birthday = convert(req.body.birthday)
          console.log(req.body.birthday);
          console.log(req.body);
          const result = await authSchema.validateAsync(req.body)
          //Check email exist
          const emailExist = await StaffInformation.findOne({ email: req.body.email })
          if (emailExist)  {
               req.flash('createUserFailed', "Email hasbeen created")
           res.redirect("/admin/createUser")
          }
          // Create new user
          const newStaff = new StaffInformation(result)
          const saveStaff = await newStaff.save()
     
      //Create  new status
           
          const statusCre = await Status.create({ 
            _id : saveStaff._id,
            timeLocation : []
           }, (err, status ) => {
                 console.log(err,status);
            }) 
     
     //Create new table
          const tableCre = await TableOfWork.create({
           _id : saveStaff._id,
            }, (err, table) =>{
                 console.log(err, table);
            })
     //Create report
          const reportCre = await  Report.create({
               _id : saveStaff._id,
               userName : saveStaff.name
            }, (err, report) => {
                 console.log(err, report);
            })
            
            console.log(statusCre, tableCre, reportCre);
            req.flash('createUserSuccess'," Create successfully")     
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