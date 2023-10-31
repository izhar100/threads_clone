const { Post } = require("../models/postModel");
const { User } = require("../models/userModel");
const cloudinay=require('cloudinary').v2

const createPost = async (req, res) => {
    try {
        const { postedBy, text } = req.body;
        let {img}=req.body
        if (!postedBy || !text) {
            return res.status(400).json({ error: "postedBy and text field is required!" })
        }
        const user = await User.findById(postedBy)
        if (!user) {
            return res.status(404).json({ error: `User not found!` });
        }
        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Unauthorized to create post!' });
        }
        const maxLength = 500;
        if (text.length > maxLength) {
            return res.status(400).json({ error: `Text length should be less than ${maxLength} characters!` })
        }
        if(img){
            const uploadedResponse=await cloudinay.uploader.upload(img)
            img=uploadedResponse.secure_url
        }
        const newPost = new Post({ postedBy, text, img })
        await newPost.save()

        return res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in createPost: ", error.message)
    }
}

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ error: `Post not found!` });
        }
        return res.status(200).json(post);

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in getPost: ", error.message)
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ error: `Post not found!` });
        }
        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You are unauthorized to delete this post' });
        }
        if(post.img){
            const imageId=post.img.split("/").pop().split(".")[0];
            await cloudinay.uploader.destroy(imageId)
        }
        await Post.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: 'Post deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in deletePost: ", error.message)
    }
}

const likeUnlikePost = async (req, res) => {
    try {
        const { id: postId } = req.params
        const userId = req.user._id;
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ error: `Post not found!` });
        }
        const userLikedPost = post.likes.includes(userId)
        if (userLikedPost) {
            //unlike the post
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } })
            res.status(200).json({ message: "Post unliked successfully" })
        } else {
            //like the post
            await Post.updateOne({ _id: postId }, { $push: { likes: userId } })
            res.status(200).json({ message: "Post liked successfully" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in likeUnlikePost: ", error.message)
    }
}

const replyToPost = async (req, res) => {
    try {
        const {text}=req.body
        const { id: postId } = req.params
        const userId = req.user._id;
        const userProfilePic=req.user.profilePic
        const username=req.user.username
        const name=req.user.name
        if(!text){
            return res.status(400).json({error:"Text field is required!"})
        }
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ error: `Post not found!` });
        }
        const reply={userId,text,username,userProfilePic,name}
        post.replies.push(reply)
        await post.save()
        res.status(201).json(reply)

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in replyToPost: ", error.message)
    }
}

const getFeedPosts=async(req,res)=>{
    try {
        const userId=req.user._id;
        const user= await User.findById(userId)
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        const following=user.following;
        if(!following){
            const feeds=await Post.find({username:ezhar}).sort({createdAt:-1})
            res.status(200).json(feeds)
        }
        const feedPosts=await Post.find({postedBy:{$in:following}}).sort({createdAt:-1})
        res.status(200).json(feedPosts)
        
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in getFeedPosts: ", error.message)
    }
}

const getUserPosts=async(req,res)=>{
   const {username}=req.params
   try {
    const user=await User.findOne({username});
    if(!user){
        return res.status(400).json({error:'User not found'})
    }
    const posts= await Post.find({postedBy:user._id}).sort({createdAt:-1})
    res.status(200).json(posts)
    
   } catch (error) {
    res.status(500).json({ error: error.message })
    console.log("Error in getUserPosts: ", error.message)
   }
}

module.exports = {
    createPost,
    getPost,
    deletePost,
    likeUnlikePost,
    replyToPost,
    getFeedPosts,
    getUserPosts
}