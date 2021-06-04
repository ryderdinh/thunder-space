const { model } = require("mongoose");
const Event = require("../../models/event");
const bcrypt = require("bcrypt");
const express = require("express")
const router = express.Router()
// var popupS = require('popups');

router.post("/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);
    Event.findById(id, (error, event) => {
        if (error) {
            res.redirect("/createEvent");
        }
        // convert type of date
        // let newDate = req.body.newDate.toString();
        // newDate = newDate.toString();
        // let arrayDate = newDate.split("-");
        // newDate = "";
        // for(let i=0; i<arrayDate.length; i++){
        //     if (arrayDate.length-i-1 !== 0){
        //         newDate += arrayDate[arrayDate.length-i-1] + "-";
        //     } else {
        //         newDate += arrayDate[arrayDate.length-i-1];
        //     }
        // }

        // console.log("success");

        // get input information
        let newDate = req.body.newDate
        let newName = req.body.newName.trim();
        let newPosition = req.body.newPosition.trim();
        updateName = newName !== ""  ? newName : event.name
        updatePosition = newPosition !== "" ? newPosition : event.position
        console.log(updateName);
        console.log(updatePosition);
        var result = {}
        if (newDate.length == 10) {
            result = {
                name: updateName,
                date: newDate,
                position: updatePosition
            }
        } else {
            result = {
                name: updateName,
                position: updatePosition
            }
        }
        console.log(result)
        // validate input information
        // switch (newName) {
        //     case "":
        //         newName = event.name;
        //         break;
        //     case null:
        //         newName = event.name;
        //         break;
        // }
        // switch (newDate) {
        //     case "":
        //         newDate = event.date;
        //         break;
        //     case null:
        //         newDate = event.date;
        //         break;
        // }
        // switch (newPosition) {
        //     case "":
        //         newPosition = event.position;
        //         break;
        //     case null:
        //         newPosition = event.position;
        //         break;
        // }
        Event.findByIdAndUpdate(
            id,
            result,
            { new: true },
            (err, event) => {
                if (err) {
                    return res.render("updateEvent");
                }
                return res.redirect("/admin/event-information");
            }
        )
    })
})

module.exports = router