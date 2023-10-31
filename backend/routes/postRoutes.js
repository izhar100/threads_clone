const express=require("express")
const { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts, getUserPosts } = require("../controllers/postController")
const { protectRoute } = require("../middlewares/protectRoute")
const postRouter=express.Router()

postRouter.get("/feed",protectRoute,getFeedPosts)
postRouter.get("/:id",getPost)
postRouter.get("/user/:username",getUserPosts)
postRouter.post("/create",protectRoute,createPost)
postRouter.delete("/:id",protectRoute,deletePost)
postRouter.put("/like/:id",protectRoute,likeUnlikePost)
postRouter.put("/reply/:id",protectRoute,replyToPost)
module.exports={
    postRouter
}