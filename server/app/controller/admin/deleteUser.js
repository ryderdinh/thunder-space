const Staff = require("../../models/staffInformation")
const Status = require("../../models/status")
const Table = require("../../models/tableOfWork")
const Report = require("../../models/report")
const flash = require("express-flash")

const express = require("express")

const router = express.Router()

router.post("", (req, res) => {
    const id = req.body.userId
    const password = req.body.password
    if (password !== "admin") {
        req.flash("err", "Your password is incorrect")
        res.redirect("/admin/userInfo?page=1")
    } else {
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
                                            res.redirect("/admin/userInfo?page=1")
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
            res.redirect("/admin/userInfo?page=1")

        }
    }
})

module.exports = router