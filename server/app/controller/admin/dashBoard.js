
const Staff = require("../../models/staffInformation")

module.exports = (req, res , next) => {
    Staff.find((err, staff) => {
        const totalUsers = staff.length
    res.render("dashboard", {
        totalUsers : totalUsers,
        path : "/admin/dashboard"
    })     
    })
}