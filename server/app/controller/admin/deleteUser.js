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
        res.redirect("/admin/user-information")
    } else {
        try {
            Staff.findByIdAndDelete(id, (err, staff) => {
            })
            Report.findByIdAndDelete(id, (err, report) => {
            })
            Status.findByIdAndDelete(id, (err, status) => {
            })
            Table.findByIdAndDelete(id, (err, table) => {
            })
            req.flash("success", "Delete user successfully")
            res.redirect("/admin/user-information")
        } catch (err) {
            req.flash = ("err", "Delete user unsuccessfully")
            res.redirect("/admin/user-information")

        }
    }
})

module.exports = router