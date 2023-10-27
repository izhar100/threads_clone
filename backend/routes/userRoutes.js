const express=require("express")
const { signupUser } = require("../controllers/userController")
const userRouter=express.Router()

userRouter.post("/signup",signupUser)

module.exports={
    userRouter
}