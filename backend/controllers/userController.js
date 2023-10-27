const { User } = require("../models/userModel");
const bcrypt=require('bcryptjs');
const { generateTokenAndSetCookie } = require("../utils/helpers/generateTokenAndSetCookie");

const signupUser=async(req,res)=>{
    try {
        const {name,email,username,password}=req.body;
        const user=await User.findOne({$or:[{email,username}]})
        if(user){
            return res.status(400).json({msg:"Email or username already exists"});
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const newUser=new User({
            name,
            email,
            username,
            password:hashedPassword
        });
        await newUser.save();
        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            res.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                username:newUser.username,
            })
        }else{
            res.status(400).json({message:"Invalid user data"});
        }
        
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log("Error in signupUser: ",error.message)
    }
}

const loginUser=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await User.findOne({username})
        const isPasswordCorrect=await bcrypt.compare(password,user?.password||"")
        if(!user || !isPasswordCorrect){
            return res.status(400).json({message:'Invalid username or password'});
        }
        generateTokenAndSetCookie(user._id,res)
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            username:user.username,
        })
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log('Error in loginUser: ',error.message)
    }
}

const logoutUser=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:1})
        res.status(200).json({message:"User logged out successfully!"})
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log('Error in logoutUser: ',error.message)
    }
}

const followUnfollowUser=async(req,res)=>{
    try {
        const {id}=req.params;
        const userToModify=await User.findById(id)
        const currentUser=await User.findById(req.user._id)
        if(id==req.user._id.toString()){
            return res.status(400).json({message:"You can not follow/unfollow yourself"})
        }
        if(!userToModify || !currentUser){
            return res.status(400).json({message:"User not found"})
        }
        const isFollowing=currentUser.following.includes(id);
        if(isFollowing){
            // unfollow
            //modify following of currentUser and follower of userToModify
            await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}})
            await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}})
            res.status(200).json({message:'User unfollowed successfully'})
        }else{
            //follow
            //modify following of currentUser and follower of userToModify
            await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}})
            await User.findByIdAndUpdate(req.user._id,{$push:{following:id}})
            res.status(200).json({message:'User followed successfully'})
        }
        
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log('Error in followUnfollowUser: ',error.message)
    }
}

const updateUser=async(req,res)=>{
    const {name,email,username,password,profilePic,bio}=req.body;
    const userId=req.user._id
    try {
        let user=await User.findById(userId)
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        if(req.params.id!==userId.toString()){
            return res.status(400).json({message:"Unauthorized to edit this profile"})
        }
        if(password){
            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(password,salt)
            user.password=hashedPassword;
        }
        user.name=name||user.name
        user.email=email||user.email
        user.username=username||user.username
        user.profilePic=profilePic||user.profilePic
        user.bio=bio||user.bio
        await user.save()
        res.status(200).json({message:"Profile updated successfully",user})
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log('Error in updateUser: ',error.message)
    }
}


module.exports={
    signupUser,
    loginUser,
    logoutUser,
    followUnfollowUser,
    updateUser
}