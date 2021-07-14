
const Staff = require("../../models/staffInformation")
const env = process.env.NODE_ENV.trim()
module.exports = (req, res , next) => {
    Staff.countDocuments((err, count) => {
    res.render("dashboards/dashboard", {
        totalUsers : count,
        path1 : "/admin/dashboard",
        path2 : "/admin/dashboard",
        env : env
    })     
    })
}