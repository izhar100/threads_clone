const jwt=require("jsonwebtoken")
require("dotenv").config()
const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},process.env.secretKey,{
        expiresIn:'10d'
    })
    res.cookie("jwt",token,{
        httpOnly:true,
        maxAge:10*24*60*60*1000,
        sameSite:"strict",//CSRf
    })
    return token
}

module.exports={
    generateTokenAndSetCookie
}