const Staff = require("../../../models/Staff")
const  cloudinary  = require("../../../../config/cloud/cloudinary") 
const fs = require("fs")
const Response = require("../../../models/Response")
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
            if(userUpload) return res.status(200).send(new Response(200, "success"))
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
        if(userUpload) return res.status(200).send(new Response(200, "success"))
       }
        fs.unlinkSync(avatar)
    } catch (err) {
        res.status(400).send(new Response(400, "something went wrong"));
    }
};

