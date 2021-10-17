const staffInfo = require("../../../models/Staff")
const convertDate = require("../../../utils/convertDate")
const express = require("express")
const router = express.Router()
const { convert } = require("../../../utils/dateFormat")

router.get("/:id", (req, res) =>{
    let id = req.params.id
    staffInfo.findById(id, (err, staffInfo ) => {
        res.json({  staffInfo : {
            name : staffInfo.name,
            birthday : staffInfo.birthday,
            phonenumber : staffInfo.phonenumber,
            position : staffInfo.position,
            department : staffInfo.department,
            email:staffInfo.email  ,
            avatar : staffInfo.avatar.url
          } })
    })
})

module.exports = router