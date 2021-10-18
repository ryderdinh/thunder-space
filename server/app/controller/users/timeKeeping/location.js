const Status = require("../../../models/status")
const History = require("../../../models/history")
const { distance } = require("../../../utils/findDistance")
const { changeTimeToFloat } = require("../../../utils/handleTime")
const router = require('express').Router()
const authenticateToken = require("../../../../middleware/user/login/authenticateToken")
const moment = require("moment")

router.put("/location/:id",  async  (req, res, next) => {
       try {
        const sId = req.params.id;
        const existStatus = await Status.findById(sId)
        const lat = Number(req.query.lat)
        const lon = Number( req.query.lon)
        const currentDistance = Math.round(
          distance(lat, lon, 20.963528714717416, 105.81668138811938)
        );
        
        if(existStatus && currentDistance){
            const currentTime = Date.now()
            if(!existStatus.timeStart){
                existStatus.timeStart = currentTime
                existStatus.timeLine.push([currentTime, currentDistance])
                existStatus.save()
            }
            if(existStatus.timeStart){
                let limitCheckIn = currentTime - existStatus.timeStart
               if(limitCheckIn > 300000){
                existStatus.timeEnd = currentTime
                existStatus.timeLine.push([currentTime, currentDistance])
                existStatus.save()
               }else{
                   return res.json({
                       status : "Try after 5 minutes !"
                   })
               }
            }
            return res.json({
                status : "Check in complete !"
            })
        }
 
       } catch (error) {
           return res.json({
               status : 'Some thing went wrong !'
           })
       }
})

module.exports = router;

