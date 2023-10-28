const jwt=require("jsonwebtoken")
const { User } = require("../models/userModel")
require("dotenv").config()
const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt
        if(!token){
            return res.status(401).json({msg:"Unauthorized"})
        }
        const decoded=jwt.verify(token,process.env.secretKey)
        const user=await User.findById(decoded?.userId).select("-password");
        req.user=user;
        next()
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log("Error in protectRoute: ",error.message)
    }
}

module.exports={
    protectRoute
}