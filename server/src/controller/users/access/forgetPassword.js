const Staff = require("../../../models/Staff")
const transporter = require('../../../../config/nodeMailer/email')
const { v4: uuidv4 } = require('uuid');
module.exports =  async (req, res, next) => {
    try {
        const resetToken = uuidv4()
        const email = req.body.email
        const user = await Staff.findOne({ email : email })
        if(!user){
            return res.status(401).send("your email does not exist")
        }
        
        const info = await transporter.sendMail({
        from: '"HRM Thunder Space 👻" <tempmailfc2@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "RESET PASSWORD ✔", // Subject line
        //   text: "Hedfasdfasdfasd", // plain text body
        html : `
                        <p>You request to reset password</p>
                        <a href="${process.env.BASE_URL}/api/reset-password/${resetToken}">CLick this link to reset password</a>,`// html body
        });
        const update = { resetToken : resetToken, resetTokenExpiration : Date.now() + 3600000}
        const staff = await Staff.findOneAndUpdate({ email : email }, update , { new : true })
         return res.status(200).send({ data : 'success' })
    }catch(err){
        console.log(err);
        return res.status(400).send("some thing went wrong")
    }
}
