const Staff = require("../../../models/Staff")
const transporter = require('../../../../config/nodeMailer/email')
const { v4: uuidv4 } = require('uuid');
const otpGenerator = require("otp-generator")
const bcrypt = require("bcrypt")
const Response = require("../../../models/Response");
module.exports =  async (req, res, next) => {
    try {
        const otpCode = otpGenerator.generate(6, {
            upperCaseAlphabets : true,
            specialChars : false,
            lowerCaseAlphabets : true,
            digits : true
        })
        const hashOtp = await bcrypt.hash(otpCode, 10)
        const email = req.body.email
        const user = await Staff.findOne({ email : email })
        if(!user){
            return res.status(401).send(new Response(401, "your email does not exist"))
        }
        
        const mailOptions = {
        from: '"HRM Thunder Space 👻" <tempmailfc2@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "RESET PASSWORD ✔", // Subject line
        //   text: "Hedfasdfasdfasd", // plain text body
        html : `
        <html lang="en-US">

        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Reset Password Email Template</title>
            <meta name="description" content="Reset Password Email Template.">
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
            </style>
        </head>
        
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                    requested to reset your password</h1>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    A unique OTP to reset your
                                                    password has been generated for you.The OTP will expire in 2 minutes
                                                </p>
                                                <a href="javascript:void(0);"
                                                    style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff; font-size:30px;padding:10px 24px;display:inline-block;border-radius:50px;">${otpCode}</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                    <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>https://thunderspace.netlify.app</strong></p>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>
        
        </html>
        `
        };
        await transporter(mailOptions)
        const update = { otp : hashOtp, otpExpiration : Date.now() + 120000}
        const staff = await Staff.findOneAndUpdate({ email : email }, update , { new : true })
         return res.status(200).send(new Response(200, 'success'))
    }catch(err){
        res.status(400).send(new Response(400, err.message))
    }
}
