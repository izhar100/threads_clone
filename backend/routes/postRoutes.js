const express=require("express")
const { createPost } = require("../controllers/postController")
const { protectRoute } = require("../middlewares/protectRoute")
const postRouter=express.Router()

postRouter.post("/create",protectRoute,createPost)

module.exports={
    postRouter
}