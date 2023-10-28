const express=require("express")
const { signupUser, loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile } = require("../controllers/userController")
const { protectRoute } = require("../middlewares/protectRoute")
const userRouter=express.Router()

userRouter.get("/profile/:username",getUserProfile)
userRouter.post("/signup",signupUser)
userRouter.post("/login",loginUser)
userRouter.post("/logout",logoutUser)
userRouter.post("/follow/:id",protectRoute,followUnfollowUser)
userRouter.post("/update/:id",protectRoute,updateUser)
module.exports={
    userRouter
}