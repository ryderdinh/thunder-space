const router = require("express").Router()
const authenticateToken = require("../../../../middleware/authenticateToken")
const Staff = require("../../../models/staffInformation")

router.get("/searchUser", async (req, res, next) => {
    try{
    const  email = req.body.email
    console.log(req);
    const existEmail = await Staff.findOne({ email : email })
    console.log(existEmail);
    if(existEmail){
        return res.json( {
            data : {
                id : existEmail.id,
                name : existEmail.name,
                position : existEmail.position,
                department : existEmail.department,
                birthday : existEmail.birthday,
                phonenumber : existEmail.phonenumber,
                avatar : existEmail.avatar.url
            }
        })
    }else{
        return res.json({ data : {
            status : "User is not available !"
        } })
    }
    }catch(err){
        if(err){
            console.log(err);
            return res.json({ data : {
                status : "Some thing went wrong  !"
            } })
        }
    }
})

module.exports = router