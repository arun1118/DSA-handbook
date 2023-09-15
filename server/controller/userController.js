import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


// -----------------------------------------------
// desc : login a user
// method : POST
// route : /users/login
// access: public
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }
    else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
})



// -----------------------------------------------
// desc : register a user
// method : POST
// route : /users/register
// access: public
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;

    const userExists=await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    const user=await User.create({
        name,email,password
    });

    if(user){
        generateToken(res,user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }
    else{
        res.status(400);
        throw new Error("Invalid user details");
    }
})


// -----------------------------------------------
// desc : logout a user
// method : POST
// route : /users/logout
// access: public
const logoutUser=asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    });
    
    res.status(200).json({message: 'user logged out'})
})


// -----------------------------------------------
// desc : get user profile
// method : GET
// route : /users/profile
// access: private
const getUserProfile=asyncHandler(async(req,res)=>{
    const user={
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user);
})


// -----------------------------------------------
// desc : update user profile
// method : PUT
// route : /users/profile
// access: private

const updateUserProfile=asyncHandler(async(req,res)=>{
    const oldUser=await User.findById(req.user._id);

    if(oldUser){
        oldUser.name=req.body.name || oldUser.name;
        oldUser.email=req.body.email || oldUser.email;
        if(req.body.password){
            oldUser.password=req.body.password;
        }

        const updateduser=oldUser.save();

        res.status(200).json({
            _id: updateduser._id,
            name: updateduser.name,
            email: updateduser.email
        });
    }
    else{
        res.status(404);
        throw new Error("User not found")
    }
})

// -------------------------------------------------------------------------------------------------

export {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};