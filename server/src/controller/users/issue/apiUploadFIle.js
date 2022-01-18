const router = require("express").Router()
const cloudinary =require("../../../../config/cloud/cloudinary")
const fs = require("fs")
module.exports = async (req, res, next) => {
try{
    const file = req.files.file.tempFilePath
    const resUpload = await cloudinary.uploader.upload(file, {
        resource_type: "auto" ,
        folder : "hrmadmin",
        upload_preset : "ml_default"
    })
    console.log(resUpload);
    fs.unlinkSync(file)
    res.json({ url : ` ${resUpload.url} ` })
    
}catch(err){
    console.log(err);
    fs.unlinkSync(file)
    return res.json({ err : "Failure !"})
}
}
