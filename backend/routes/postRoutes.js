const express=require("express")
const { createPost, getPost, deletePost, likeUnlikePost, replyToPost } = require("../controllers/postController")
const { protectRoute } = require("../middlewares/protectRoute")
const postRouter=express.Router()

postRouter.get("/:id",getPost)
postRouter.post("/create",protectRoute,createPost)
postRouter.delete("/:id",protectRoute,deletePost)
postRouter.post("/like/:id",protectRoute,likeUnlikePost)
postRouter.post("/reply/:id",protectRoute,replyToPost)

module.exports={
    postRouter
}