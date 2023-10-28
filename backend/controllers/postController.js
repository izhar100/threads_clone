const { Post } = require("../models/postModel");
const { User } = require("../models/userModel");

const createPost=async(req,res)=>{
    try {
        const {postedBy,text,img}=req.body;
        if(!postedBy || !text){
            return res.status(400).json({message:"postedBy and text field is required!"})
        }
        const user=await User.findById(postedBy)
        if(!user){
            return res.status(404).json({message:`User not found!`});
        }
        if(user._id.toString()!==req.user._id.toString()){
            return res.status(401).json({message:'Unauthorized to create post!'});
        }
        const maxLength=500;
        if(text.length>maxLength){
            return res.status(400).json({message:`Text length should be less than ${maxLength} characters!`})
        }
        const newPost=new Post({postedBy,text,img})
        await newPost.save()
        
        return res.status(201).json({message: "Post created successfully",newPost});
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log("Error in createPost: ",error.message)
    }
}

module.exports={
    createPost
}