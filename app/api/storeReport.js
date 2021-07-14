const Staff = require('../models/staffInformation')
const Report = require("../models/report")
const authenticateToken = ("")
const express =require("express")
const router = express.Router()
const { convert } = require("../utils/dateFormat")
const moment = require("moment-timezone")
const { v4: uuidv4 } = require('uuid');
router.post("/:id", (req, res) => {
    const rid = uuidv4()
    var time = moment.tz("Asia/Ho_Chi_Minh").format("hh:mm:ss")
    var date = convert(Date.now())
    const id = req.params.id
    const dataUser = JSON.parse(Object.keys(req.body)[0]);
    dataUser.date.dateStart = convert(dataUser.date.dateStart)
    dataUser.date.dateEnd = convert(dataUser.date.dateEnd)
    
    const checkType = dataUser.typeReport
    if (checkType === "true") {
        Report.findByIdAndUpdate( id,{
            $push : { "reportDetails" : { 
                rid: rid,
                 typeReport : dataUser.typeReport,
                date : {
                    dateStart : dataUser.date.dateStart,
                    dateEnd : dataUser.date.dateEnd,
                 },
                content: dataUser.content
            }} 
        }, (err, report) => {
            // if (!err) {
            //     Staff.findByIdAndUpdate(id,  { $push : { activity_log: {
            //         rid : rid,
            //         status : `Create a report at ${time} in ${date}`
            //       }} },
            //       (err, staff) => {
            //             if(!err){
            //                 return  res.json({ data : { status : "Report complete" }} )
            //             }
            //       })
            // }
            // else res.json({data : { status : "Canot report" }})
        })
    } else  if(checkType === "false" ) {
        
        Report.findByIdAndUpdate( id,{
            $push : { "reportDetails" : { 
                rid: rid,
                 typeReport : dataUser.typeReport,
                date : {
                    dateStart : dataUser.date.dateStart,
                    dateEnd : null,
                 },
                content: dataUser.content
            }} 
        }, (err, report) => {
            // if (!err) {
            //     Staff.findByIdAndUpdate(id,  { $push : { activity_log: {
            //         rid : rid,
            //         status : `Create a report at ${time} in ${date}`
            //       }} },
            //       (err, staff) => {
            //             if(!err){
            //                 return  res.json({ data : { status : "Report complete" }} )
            //             }
            //       })
            
            // }
            // else res.json({data : { status : "Canot report" }})
        })
       
    }
})

module.exports = router

