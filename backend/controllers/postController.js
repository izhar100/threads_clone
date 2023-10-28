const { Post } = require("../models/postModel");
const { User } = require("../models/userModel");

const createPost = async (req, res) => {
    try {
        const { postedBy, text, img } = req.body;
        if (!postedBy || !text) {
            return res.status(400).json({ message: "postedBy and text field is required!" })
        }
        const user = await User.findById(postedBy)
        if (!user) {
            return res.status(404).json({ message: `User not found!` });
        }
        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Unauthorized to create post!' });
        }
        const maxLength = 500;
        if (text.length > maxLength) {
            return res.status(400).json({ message: `Text length should be less than ${maxLength} characters!` })
        }
        const newPost = new Post({ postedBy, text, img })
        await newPost.save()

        return res.status(201).json({ message: "Post created successfully", newPost });
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("Error in createPost: ", error.message)
    }
}

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: `Post not found!` });
        }
        return res.status(200).json(post);

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("Error in getPost: ", error.message)
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: `Post not found!` });
        }
        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are unauthorized to delete this post' });
        }
        await Post.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: 'Post deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("Error in deletePost: ", error.message)
    }
}

const likeUnlikePost = async (req, res) => {
    try {
        const { id: postId } = req.params
        const userId = req.user._id;
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: `Post not found!` });
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
        res.status(500).json({ message: error.message })
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
        if(!text){
            return res.status(400).json({message:"Text field is required!"})
        }
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: `Post not found!` });
        }
        const reply={userId,text,username,userProfilePic}
        post.replies.push(reply)
        await post.save()
        res.status(201).json({ message: "Reply added successfully",post})

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("Error in replyToPost: ", error.message)
    }
}

module.exports = {
    createPost,
    getPost,
    deletePost,
    likeUnlikePost,
    replyToPost
}