
const { env } = require("shelljs")
const Event = require("../../../models/event")
const { convert } = require("../../../utils/dateFormat")

module.exports = (req, res) => {
    

    Event.find({}, (err, event) =>{
        if(err) {
            res.json({data : {status : "Cannot access event"}})
        }
         event = event.map(e => 
            e = {
                eid : e.eid,
                name : e.name,
                date : convert(e.date),
                event_detail : e.event_detail
            }
        )
        res.json({ 
            event
         })
    })
}

// { data : {
//     date : convert.toLocaleDateString(),
//     name : event.name,
//     position : event.position
// } }