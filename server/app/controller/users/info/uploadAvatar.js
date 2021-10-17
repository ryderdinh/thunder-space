const Staff = require("../../../models/Staff")
const express = require('express')
const router = express.Router()
const  cloudinary  = require("../../../../config/cloud/cloudinary") 
const fs = require("fs")
// const upload = require("../../../../config/multer")

router.post('/upload/avatar/:id', async (req, res) => {
    try {
        const id = req.params.id
        const avatar = req.files.image.tempFilePath
        const staffInfo = await Staff.findById(id)
        if(staffInfo.avatar.public_id == ""){
            const uploadResponse = await cloudinary.uploader.upload(avatar, {
                resource_type: "image" ,
                upload_preset : "ml_default",
                folder : "avatar",
            });
            Staff.findByIdAndUpdate(id, {
                    avatar : {
                            public_id : uploadResponse.public_id,
                            url :uploadResponse.url
                        }
                    }, (err, staff) => {
                        if(!err){
                            fs.unlinkSync(avatar)
                            res.json({ data : { 
                                status : "Upload avatar successfully !!!!!",
                            } });
                        }
                    })
        }else{
            const uploadResponse = await cloudinary.uploader.upload(avatar, {
                resource_type: "image" ,
                upload_preset : "ml_default",
                public_id : staffInfo.avatar.public_id,
                overwrite :"true"
            });
            Staff.findByIdAndUpdate(id, {
                    avatar : {
                            public_id : uploadResponse.public_id,
                            url :uploadResponse.url
                        }
                    }, (err, staff) => {
                        if(!err){
                            fs.unlinkSync(avatar)
                            res.json({ data : { 
                                status : "Upload avatar successfully !!!!!",
                            } });
                        }
                    })
        }
    } catch (err) {
        fs.unlinkSync(avatar)
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

module.exports = router
