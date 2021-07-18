const { model } = require("mongoose");
const Event = require("../../../models/event");
const bcrypt = require("bcrypt");
const express = require("express")
const router = express.Router()
const moment = require('moment')
const { authSchema } = require("../../../../middleware/checkFormEvent")
const checkAuthenticated = require("../../../../middleware/checkAuthenticated")

router.post("/updateEvent", checkAuthenticated, (req, res) => {
    // console.log(req.body);
    let id = req.body.id;
    // get input information
    var newTime = req.body.newTime
    var newName = req.body.newName.trim();
    var newPosition = req.body.newPosition.trim();
    var newContent = req.body.content.trim()
    var newTag = req.body.tag
    var result = {}
    const validTime = moment(newTime, "hh:mm a").isValid()

    Event.findById(id, (error, event) => {
        if (error) {
            res.redirect("/createEvent");
        }
        updateName = newName !== ""  ? newName : event.name
        updatePosition = newPosition !== "" ? newPosition : event.event_detail.position
        updateContent = newContent !== "" ? newContent : event.event_detail.content

        if (validTime) {
            // const hour = moment(req.body.newDate).format("LTS")
            result = {
                name: updateName,
                tag: newTag,
                event_detail : {
                    hours : newTime,
                    position : updatePosition,
                    content : updateContent
                }
            }
        } else {
            result = {
                name: updateName,
                event_detail : {
                    position : updatePosition,
                    content : updateContent
                }
            }
        }
        Event.findByIdAndUpdate(
            id,
            result,
            { new: true },
            (err, event) => {
                if (err) {
                    req.flash("err","Update event failure")
                res.redirect("/admin/eventInfo");
                }
                req.flash("success","Update event successfully")
                res.redirect("/admin/eventInfo");
            }
        )
    })
})

module.exports = router