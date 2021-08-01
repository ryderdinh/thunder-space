var cron = require('node-cron');
const Staff = require("../app/models/staffInformation")
const Table  = require("../app/models/tableOfWork")
const Status  = require("../app/models/status")
const Report  = require("../app/models/report")
module.exports = cron.schedule('* */1 * * *', () => {
    const query = { confirmEmail : false, confirmEmailExpiration :  { $lte : Date.now() } }
    Staff.deleteMany(query)
    Table.deleteMany(query)
    Status.deleteMany(query)
    Report.deleteMany(query)
});