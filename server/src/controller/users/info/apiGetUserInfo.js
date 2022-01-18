const Staff = require("../../../models/Staff")
const convertDate = require("../../../utils/convertDate")
const express = require("express")
const router = express.Router()
const { convert } = require("../../../utils/dateFormat")

module.exports = async  (req, res) =>{
    try {
        const userId = req.user.id
        const staff = await Staff.findById(userId)
        if(staff){
            return await res.status(200).send(staff.getProfile())
        }else{
            return res.status(401).send("unauthorize")
        }
    } catch (error) {
            return res.status(400).send("some thing went wrong")       
    }

}
