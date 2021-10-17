const cloudinary = require("../../../../config/cloud/cloudinary")
const express = require("express")
const router = express.Router()
router.post("/testApi", async (req, res) => {
        try {
            let publicIdAvatar = "avatar/tmp-1-1634484797396_rnier2"
            let deleteAvatar = cloudinary.api.delete_resources(publicIdAvatar);
            console.log(deleteAvatar);

            return console.log("Delete successfully")
        } catch (err) {
           return console.log(err);
        }
    
})

module.exports = router