const Staff = require("../../../models/Staff")
const Status = require("../../../models/status")
const TimeSheet = require("../../../models/TimeSheet")
const Report = require("../../../models/Report")
const cloudinary = require("../../../../config/cloud/cloudinary")
const checkAuthenticated =require("../../../middleware/admin/login/checkAuthenticated")
const express = require("express")
const router = express.Router()
const defaulPublicIdAvatar = "avatar/avatar-none_byqbnn" 

router.post("/userInfo/delete", checkAuthenticated, async (req, res) => {
    const id = req.body.searchId
        try {
           let deletedUser = await Staff.findByIdAndDelete(id).exec()
           let deletedReport = await Report.findByIdAndDelete(id).exec()
           let deletedStatus = await Status.findByIdAndDelete(id).exec()
           let deletedTimeSheet = await TimeSheet.findByIdAndDelete(id).exec()
           let publicIdAvatar = deletedUser.avatar.public_id
           if(publicIdAvatar != defaulPublicIdAvatar){
            let deleteAvatar = cloudinary.api.delete_resources(publicIdAvatar);
            console.log(deleteAvatar);
           }
            res.redirect("/admin/userInfo")

        } catch (err) {
            req.flash("err", "Delete user unsuccessfully")
            res.redirect("/admin/userInfo")
        }
    
})

module.exports = router