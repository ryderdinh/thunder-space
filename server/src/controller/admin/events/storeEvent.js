const Event = require("../../../models/event")
const flash = require("express-flash")
const moment = require("moment")
const { v4: uuidv4 } = require('uuid');

module.exports =async (req, res, next) => {
    const date = moment(req.body.start).format("YYYY-MM-DD")
    console.log(req.body);
    Event.create({
        eid : uuidv4(),
        name : req.body.name,
        tag : req.body.tag,
        date : date,
        event_detail : {
            hours : req.body.time,
            position : req.body.position,
            content : ""
        }
    }, (err, event) => {
        if(!err) res.redirect("/admin/eventInfo")
    })
   
}



