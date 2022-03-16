const Staff = require("../../../models/Staff")
const  cloudinary  = require("../../../../config/cloud/cloudinary") 
const fs = require("fs")

module.exports  = async (req, res) => {
    try {
        const _id = req.user._id
        const avatar = req.files.image.tempFilePath
        const user = await Staff.findById(_id)
        if(user && user.avatar.public_id === ""){
            const uploadResponse = await cloudinary.uploader.upload(avatar, {
                resource_type: "image" ,
                upload_preset : "ml_default",
                folder : "avatar",
            });
            const userUpload = await Staff.findByIdAndUpdate(_id, {
                    avatar : {
                            public_id : uploadResponse.public_id,
                            url :uploadResponse.url
                        }
                    }, { new : true })
            fs.unlinkSync(avatar)
            if(userUpload) return res.status(200).send({ status : 200, data : "success" })
        }
       if(user && user.avatar.public_id != ""){
        const uploadResponse = await cloudinary.uploader.upload(avatar, {
            resource_type: "image" ,
            upload_preset : "ml_default",
            public_id : user.avatar.public_id,
            overwrite :"true"
        });
       const userUpload = await Staff.findByIdAndUpdate(_id, {
                avatar : {
                        public_id : uploadResponse.public_id,
                        url :uploadResponse.url
                    }
                }, { new : true })
        fs.unlinkSync(avatar)
        if(userUpload) return res.status(200).send({ status : 200, data : 'success' })
       }
        fs.unlinkSync(avatar)
        return res.status(401).send({ status: 401, error :"unauthorize" })
    } catch (err) {
        console.log(err);
        res.status(400).send({ status : 400, error :"something went wrong" });
    }
};

