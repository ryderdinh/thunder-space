
const Staff = require("../../models/staffInformation")
const History = require("../../models/history")
const env = process.env.NODE_ENV.trim()
module.exports = (req, res , next) => {
    const countHistory = History.countDocuments()
    Staff.countDocuments((err, count) => {
        countHistory.then(data => {
            if(data < 5){
                History.find({})
                .then(histories => {
                    res.render("dashboards/dashboard", {
                        totalUsers : count,
                        histories : histories,
                        path1 : "/admin/dashboard",
                        path2 : "/admin/dashboard",
                        env : env,
                        title : "Dashboard"
                    })
                })
            }else{
                var total = data
                History.find({})
                .skip(total - 5)
                .then(histories => {
                    res.render("dashboards/dashboard", {
                        totalUsers : count,
                        histories : histories,
                        path1 : "/admin/dashboard",
                        path2 : "/admin/dashboard",
                        env : env,
                        title : "Dashboard"
                    })
                })
            }
        })
    })
}