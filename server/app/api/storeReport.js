const Report = require("../models/report")
const express =require("express")
const router = express.Router()
const { convert } = require("../utils/dateFormat")
router.post("/:id", (req, res) => {
    const id = req.params.id
    const dataUser = JSON.parse(Object.keys(req.body)[0]);
    dataUser.date.dateStart = convert(dataUser.date.dateStart)
    dataUser.date.dateEnd = convert(dataUser.date.dateEnd)
    
    const checkType = dataUser.typeReport
    if (checkType === "true") {
        Report.findByIdAndUpdate( id,{
            $push : { "reportDetails" : { 
                 typeReport : dataUser.typeReport,
                date : {
                    dateStart : dataUser.date.dateStart,
                    dateEnd : dataUser.date.dateEnd,
                 },
                content: dataUser.content
            }} 
        }, (err, report) => {
            if (!err) {
                res.json({ data : { status : "Report complete" }} )
            }
            else res.json({data : { status : "Canot report" }})
        })
    } else  if(checkType === "false" ) {
        
        Report.findByIdAndUpdate( id,{
            $push : { "reportDetails" : { 
                 typeReport : dataUser.typeReport,
                date : {
                    dateStart : dataUser.date.dateStart,
                    dateEnd : null,
                 },
                content: dataUser.content
            }} 
        }, (err, report) => {
            if (!err) {
                res.json({ data : { status : "Report complete" }} )
            }
            else res.json({data : { status : "Canot report" }})
        })
       
    }
})

module.exports = router

