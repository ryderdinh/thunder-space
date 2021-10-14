const Event = require("../../../models/event");
const checkAuthenticated = require("../../../../middleware/checkAuthenticated")
const express = require("express")
const router = express.Router()
const { convert } = require("../../../utils/dateFormat")

router.get("/event-information", checkAuthenticated, (req, res, next) => {

    const PAGE_SIZE = 10
    var page = req.query.page
    if (page) {
        page = parseInt(page)
    if(page <=0){
        return res.redirect("/admin/event-information?page=1")
    }
        var skip = (page - 1) * PAGE_SIZE
        Event.find({})
            .skip(skip)
            .limit(PAGE_SIZE)
            .then(event => {
                Event.countDocuments((err, count) => {
                    const pages = Math.ceil(count / PAGE_SIZE)
                    event.forEach(e => {
                        e.date = convert(e.date)
                    })
                        res.render("event", {
                            eventList: event,
                            path: "/admin/event-information",
                            pages: pages,
                            page : page
                        })
                    
                })
            })

    } else {
        res.redirect("/admin/event-information")
    }

})

module.exports = router


