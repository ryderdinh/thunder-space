const Staff = require("../../../models/staffInformation")
const Status = require("../../../models/status")
const Table = require("../../../models/tableOfWork")
const Report = require("../../../models/report")
const flash = require("express-flash")
const Swal = require('sweetalert2')
const checkAuthenticated =require("../../../../middleware/checkAuthenticated")
const express = require("express")

const router = express.Router()

router.post("/userInfo/delete", checkAuthenticated,  (req, res) => {
    const id = req.body.searchId
        try {
            Staff.findByIdAndDelete(id, (err, staff) => {
                if (!err) {
                    Report.findByIdAndDelete(id, (err, report) => {
                        if (!err) {
                            Status.findByIdAndDelete(id, (err, status) => {
                                if(!err){
                                    Table.findByIdAndDelete(id, (err, table) => {
                                        if (!err) {
                                            req.flash("success", "Delete user successfully")
                                            res.redirect("/admin/userInfo")
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        } catch (err) {
            req.flash("err", "Delete user unsuccessfully")
            res.redirect("/admin/userInfo")
        }
    
})

module.exports = router