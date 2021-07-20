
const express = require('express')
const router = express.Router()
const  cloudinary  = require("../../../../config/cloudinary") 
// const upload = require("../../../../config/multer")

router.post('/upload/file', async (req, res) => {
    try {
        // console.log(req.body);
        const fileStr = req.files.image.tempFilePath
        console.log(req.files);
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset : "ml_default"
        });
        console.log(uploadResponse);
        res.json({ data : { status : "Upload file successfully !!!!!" } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

module.exports = router
