const mongoose = require("mongoose")
const Event = require("../../models/event")
const flash = require("express-flash")
const moment = require("moment")
const { authSchema } = require("../../../middleware/checkFormEvent")


module.exports =async (req, res, next) => {
    try{
        const hour = moment(req.body.date).format("LTS")
        const auth = {
            name : req.body.name,
            date : req.body.date,
            event_detail : {
                hours : hour,
                position : req.body.position,
                content : req.body.content
            }
        }
       
        const result = await authSchema.validateAsync(auth)
        const newEvent = new Event(result)
        const saveEvent = await newEvent.save()
        console.log(saveEvent);
        req.flash('create', "Create successfully")
        res.redirect("/admin/createEvent")

    }catch(err){
        if (err.isJoi === true ) {
            req.flash('createFailed', `${err}`);
            res.redirect("/admin/createEvent")
        }
                next()
    }
}

// else{
//     req.flash('createFailed', "Cannot create");
//     res.redirect("/admin/createEvent")
// }    

