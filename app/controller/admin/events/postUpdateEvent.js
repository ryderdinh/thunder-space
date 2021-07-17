const { model } = require("mongoose");
const Event = require("../../../models/event");
const bcrypt = require("bcrypt");
const express = require("express")
const router = express.Router()
const moment = require('moment')
const { authSchema } = require("../../../../middleware/checkFormEvent")

router.post("/:id", (req, res) => {
    let id = req.params.id;
    // get input information
    var newDate = req.body.newDate
    var newName = req.body.newName.trim();
    var newPosition = req.body.newPosition.trim();
    var newContent = req.body.newContent.trim()
    var result = {}
    const validDate = moment(newDate, "YYYY-MM-DDThh:mm").isValid()

    Event.findById(id, (error, event) => {
        if (error) {
            res.redirect("/createEvent");
        }
        updateName = newName !== ""  ? newName : event.name
        updatePosition = newPosition !== "" ? newPosition : event.event_detail.position
        updateContent = newContent !== "" ? newContent : event.event_detail.content

        if (validDate) {
            const hour = moment(req.body.newDate).format("LTS")
            result = {
                name: updateName,
                date: newDate,
                event_detail : {
                    hours : hour,
                    position : updatePosition,
                    content : updateContent
                }
            }
        } else {
            result = {
                name: updateName,
                event_detail : {
                    hours : moment(event.date).format("LTS"),
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
                res.redirect("/admin/event-information?page=1");
                }
                req.flash("success","Update event successfully")
                res.redirect("/admin/event-information?page=1");
            }
        )
    })
})

module.exports = router