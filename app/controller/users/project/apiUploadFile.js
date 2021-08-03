const router = require("express").Router()
const { json } = require("body-parser")
const cloudinary = require("../../../../config/cloud/cloudinary")
const fs = require("fs")
const { RSA_NO_PADDING } = require("constants")
router.post("/uploadFile", async (req, res, next) => {
    try{
    const file = req.files.file.tempFilePath
    const uploadResponse = await cloudinary.uploader.upload(file, {
        upload_preset : "ml_default",
        folder : "hrmadmin",
        resource_type : "auto"
    })
    console.log(uploadResponse);
    return res.json({ status : "Success !" })
    }catch(err){
        console.log(err);
        fs.unlinkSync(file)
        return res.json({ err : "Something went wrong !" })
    }
})

module.exports = router