const cloudinary = require("../../../../config/cloud/cloudinary")
const fs = require("fs")
const Response = require('../../../models/Response')
module.exports = async (req, res, next) => {
    try {
        if (Array.isArray(req.files.files)) {
            const files = (req.files.files).map(e => e = e.tempFilePath);
            let sizeFile = 0;
            for (let i = 0; i < files.length; i++) { sizeFile += req.files.files[i].size }
            if (sizeFile / (1024 * 1024) > 10) {
                for (let i = 0; i < files.length; i++) { await fs.unlinkSync(files[i]) }
                return res.status(400).send(new Response(400, "file too large"));
            }
            for (let i = 0; i < files.length; i++) {
                const resUpload = await cloudinary.uploader.upload(files[i], {
                    resource_type: "auto" ,
                    folder : "hrmadmin",
                    upload_preset: "ml_default",
                })
                await fs.unlinkSync(files[i])
            }
            return res.status(200).send(new Response(200, "success"))
        }
        const file = req.files.files;
        if (file.size / (1024 * 1024) > 10) {
            await fs.unlinkSync(file.tempFilePath)
            return res.status(400).send(new Response(400, "file too large"));
        }
        const resUpload = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto" ,
            folder : "hrmadmin",
            upload_preset: "ml_default",
        })
        await fs.unlinkSync(file.tempFilePath)
        return res.status(200).send(new Response(200, "success"))
    } catch (err) {
        return res.status(400).send(new Response(400, err.message));
    }
}
