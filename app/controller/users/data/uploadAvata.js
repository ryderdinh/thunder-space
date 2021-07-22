const Staff = require("../../../models/staffInformation")
const express = require('express')
const router = express.Router()
const  cloudinary  = require("../../../../config/cloud/cloudinary") 
const fs = require("fs")
// const upload = require("../../../../config/multer")

router.post('/upload/avata/:id', async (req, res) => {
    try {
        const id = req.params.id
        const avata = req.files.image.tempFilePath
        const staffInfo = await Staff.findById(id)
        if(staffInfo.avata.public_id == ""){
            const uploadResponse = await cloudinary.uploader.upload(avata, {
                resource_type: "image" ,
                upload_preset : "ml_default",
                folder : "avata",
            });
            Staff.findByIdAndUpdate(id, {
                    avata : {
                            public_id : uploadResponse.public_id,
                            url :uploadResponse.url
                        }
                    }, (err, staff) => {
                        if(!err){
                            fs.unlinkSync(avata)
                            res.json({ data : { 
                                status : "Upload avata successfully !!!!!",
                            } });
                        }
                    })
        }else{
            const uploadResponse = await cloudinary.uploader.upload(avata, {
                resource_type: "image" ,
                upload_preset : "ml_default",
                public_id : staffInfo.avata.public_id,
                overwrite :"true"
            });
            Staff.findByIdAndUpdate(id, {
                    avata : {
                            public_id : uploadResponse.public_id,
                            url :uploadResponse.url
                        }
                    }, (err, staff) => {
                        if(!err){
                            fs.unlinkSync(avata)
                            res.json({ data : { 
                                status : "Upload avata successfully !!!!!",
                            } });
                        }
                    })
        }
    } catch (err) {
        fs.unlinkSync(avata)
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

module.exports = router
